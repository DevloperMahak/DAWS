import React from "react";
import { Handle, Position } from "reactflow";

type Props = {
  data: {
    label: string;
    expandable?: boolean;
    onToggle?: () => void;
  };
};

export default function NotebookNode({ data }: Props) {
  return (
    <div className="relative flex items-center">
      {/* LEFT HANDLE */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 8,
          height: 8,
          background: "#7c3aed",
          border: "2px solid white",
        }}
      />

      {/* NODE CARD */}
      <div
        className="px-5 py-3 rounded-xl shadow-md text-sm font-medium"
        style={{
          background: "#bfd4f2",
          minWidth: 220,
        }}
      >
        {data.label}
      </div>

      {/* RIGHT HANDLE */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 8,
          height: 8,
          background: "#7c3aed",
          border: "2px solid white",
        }}
      />

      {/* TOGGLE BUTTON */}
      {data.expandable && (
        <button
          onClick={data.onToggle}
          className="ml-2 w-7 h-7 rounded-full text-sm"
          style={{
            background: "#bfd4f2",
          }}
        >
          &gt;
        </button>
      )}
    </div>
  );
}
