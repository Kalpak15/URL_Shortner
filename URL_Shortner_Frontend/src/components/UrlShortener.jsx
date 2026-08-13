import { useState } from "react";
import { Copy, Check, Link2 } from "lucide-react";

// Point this at wherever your Express backend actually lives.
const API_ENDPOINT = "/api/shorten";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!url.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong on the server.");
      }

      const data = await res.json();
      setShortUrl(data.short_url);
      setUrl("");
    } catch (err) {
      setError(err.message || "Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-sm tracking-wide text-blue-700 border border-blue-700 rounded px-1.5 py-0.5">
            snip
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-1">
          Make a link shorter.
        </h1>
        <p className="text-stone-500 mb-8">
          Paste a long URL, get something you can actually read out loud.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex border border-stone-300 rounded-xl bg-white overflow-hidden focus-within:border-blue-700 transition-colors">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/some/very/long/path"
              required
              className="flex-1 px-4 py-3.5 text-sm outline-none bg-transparent placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 text-sm font-semibold bg-stone-900 text-stone-50 hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Shortening…" : "Shorten"}
            </button>
          </div>
          <div className="text-xs text-red-700 min-h-[16px]">{error}</div>
        </form>

        {shortUrl && (
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-dashed border-blue-700 bg-blue-50 p-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-blue-700 hover:underline break-all flex items-center gap-2"
            >
              <Link2 size={14} className="shrink-0" />
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1 text-xs border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md px-3 py-1.5 transition-colors"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        <div className="mt-10 font-mono text-xs text-stone-400">
          POST /api/shorten · expects {"{ url }"} · returns {"{ short_url }"}
        </div>
      </div>
    </div>
  );
}