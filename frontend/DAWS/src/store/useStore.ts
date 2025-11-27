import {create} from 'zustand';

interface Store {
  theme: "light" | "dark";
  toggleTheme: () => void;
  userSession: any;
  setUserSession: (session: any) => void;
  selectedProject: string | null;
  setSelectedProject: (project: string) => void;
}

export const useStore = create<Store>((set) => ({
  theme:  (localStorage.getItem("theme") as "light" | "dark") ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  toggleTheme: () =>
    set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
      if (newTheme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  userSession: null,
  setUserSession: (session) => set({ userSession: session }),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));