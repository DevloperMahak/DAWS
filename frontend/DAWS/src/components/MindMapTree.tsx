import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Position,
  Handle,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { toPng } from "html-to-image";

type MindMapNode = {
  title: string;
  children?: MindMapNode[];
};

type Props = {
  data: MindMapNode;
};

const nodeTypes = {
  notebook: NotebookNode,
};

function NotebookNode({ data }: any) {
  const hasChildren = data.children?.length > 0;

  const bgColor =
    data.level === 0
      ? "#7c3aed"
      : data.level === 1
        ? "#2563eb"
        : data.level === 2
          ? "#10b981"
          : "#f59e0b";

  return (
    <div className="relative flex items-center">
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 10,
          background: bgColor,
          border: "2px solid white",
        }}
      />

      <div
        className="px-5 py-3 rounded-2xl shadow-xl text-white font-medium transition-all hover:scale-105"
        style={{
          background: bgColor,
          minWidth: "220px",
        }}
      >
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          background: bgColor,
          border: "2px solid white",
        }}
      />

      {hasChildren && (
        <button
          onClick={data.onToggle}
          className="ml-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ background: bgColor }}
        >
          {data.collapsed ? "▶" : "▼"}
        </button>
      )}
    </div>
  );
}

export default function MindMapFlow({ data }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  const toggleNode = useCallback((id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const exportPNG = async () => {
    if (!flowRef.current) return;

    const dataUrl = await toPng(flowRef.current);

    const link = document.createElement("a");
    link.download = "roadmap.png";
    link.href = dataUrl;
    link.click();
  };
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const baseHorizontalGap = 320;
    const baseVerticalGap = 90;

    const getSubtreeHeight = (node: MindMapNode, path = "root"): number => {
      if (collapsed[path]) return 1;

      if (!node.children?.length) return 1;

      return node.children.reduce(
        (sum, child, index) =>
          sum + getSubtreeHeight(child, `${path}-${child.title}-${index}`),
        0,
      );
    };

    const getVisibleNodeCount = (node: MindMapNode, path = "root"): number => {
      if (collapsed[path]) return 1;

      if (!node.children?.length) return 1;

      return (
        1 +
        node.children.reduce(
          (sum, child, index) =>
            sum + getVisibleNodeCount(child, `${path}-${child.title}-${index}`),
          0,
        )
      );
    };

    const traverse = (
      node: MindMapNode,
      x: number,
      y: number,
      parentId?: string,
      level = 0,
      path = "root",
    ) => {
      const id = path;
      const isCollapsed = collapsed[id];

      nodes.push({
        id,
        position: { x, y },
        type: "notebook",
        style: {
          transition: "all 0.4s ease",
        },
        data: {
          label: node.title,
          children: node.children,
          collapsed: isCollapsed,
          level,
          onToggle: () => toggleNode(id),
        },
      });

      if (parentId) {
        edges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          type: "bezier",
          animated: true,
          style: {
            stroke: "#94a3b8",
            strokeWidth: 2,
          },
        });
      }

      if (!isCollapsed && node.children?.length) {
        const visibleCount = getVisibleNodeCount(node, path);

        const dynamicVerticalGap = Math.max(
          baseVerticalGap,
          70 + visibleCount * 6,
        );

        const dynamicHorizontalGap = Math.max(
          baseHorizontalGap,
          280 + level * 40,
        );

        let currentY =
          y - ((getSubtreeHeight(node, path) - 1) * dynamicVerticalGap) / 2; //To keep our root node centered with respect to its children

        node.children.forEach((child, index) => {
          const childHeight = getSubtreeHeight(
            child,
            `${path}-${child.title}-${index}`,
          );

          const childY =
            currentY + ((childHeight - 1) * dynamicVerticalGap) / 2;

          traverse(
            child,
            x + dynamicHorizontalGap,
            childY,
            id,
            level + 1,
            `${path}-${child.title}-${index}`,
          );

          currentY += childHeight * dynamicVerticalGap;
        });
      }
    };

    traverse(data, 80, 300);

    return { nodes, edges };
  }, [data, collapsed, toggleNode]);

  return (
    <div
      className={`flex gap-4 ${
        isFullscreen ? "fixed inset-0 z-50 bg-slate-950 p-4" : ""
      }`}
    >
      {/* MINDMAP */}
      <div
        ref={flowRef}
        className="flex-1 rounded-2xl overflow-visible relative"
        style={{
          height: "750px",
          background: "#020617",
          border: "1px solid #1e293b",
        }}
      >
        <div className="p-3 flex justify-end gap-3">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>

          <button
            onClick={exportPNG}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold"
          >
            Export PNG
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: false,
          }}
          minZoom={0.3}
          maxZoom={1.5}
          panOnDrag
          zoomOnScroll
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          onNodeClick={(_, node) => setSelectedNode(node.data.label)}
        >
          <Background gap={24} size={1} />
          <Controls position="top-right" />
        </ReactFlow>
      </div>

      {/* DETAILS PANEL */}
      <div
        className="w-80 rounded-2xl p-5"
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          color: "white",
        }}
      >
        <h2 className="text-xl font-bold mb-4">📌 Node Details</h2>
        {selectedNode ? (
          <div>
            <p className="text-lg font-semibold">{selectedNode}</p>
            <p className="text-sm opacity-70 mt-2">
              This section contains roadmap details for {selectedNode}.
            </p>
          </div>
        ) : (
          <p className="opacity-60">Click any node to view details.</p>
        )}
      </div>
    </div>
  );
}
