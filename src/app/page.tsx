import { Viewer } from "../components/Viewer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 justify-center h-full">
      <h1 className="text-4xl font-bold">Search Unsplash</h1>
      <Viewer />
    </main>
  );
}
