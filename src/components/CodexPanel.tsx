import { type ReactNode, useMemo, useState } from "react";
import type { LoreEntry } from "../data/loreEntries";

type CodexPanelProps = {
  entries: LoreEntry[];
};

function markdownPreview(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(0, 18)
    .map((line) => line.replace(/^#{1,6}\s*/, "").replace(/^\-\s*/, ""))
    .join("\n");
}

function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line, index) => {
      const match = /^(#{2,4})\s+(.+)$/.exec(line);
      return match
        ? {
            id: `section-${index}`,
            level: match[1].length,
            title: match[2],
          }
        : null;
    })
    .filter((heading) => heading !== null);
}

function countWords(markdown: string) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[|*>_\-:`]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function MarkdownReader({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul className="reader-list" key={`list-${blocks.length}`}>
          {listItems.map((item, index) => (
            <li key={`${item}-${index}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, ...rows] = tableRows.filter((row) => !row.every((cell) => /^-+$/.test(cell)));
      blocks.push(
        <table className="reader-table" key={`table-${blocks.length}`}>
          <thead>
            <tr>
              {header.map((cell) => (
                <th key={cell}>{renderInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row.join("-")}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      );
      tableRows = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushTable();
      return;
    }

    if (/^\|.+\|$/.test(trimmed)) {
      flushList();
      tableRows.push(
        trimmed
          .slice(1, -1)
          .split("|")
          .map((cell) => cell.trim()),
      );
      return;
    }

    flushTable();

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushList();
      const level = heading[1].length;
      const title = heading[2];
      const id = level >= 2 ? `section-${index}` : undefined;

      if (level === 1) {
        blocks.push(<h2 key={`h-${index}`}>{title}</h2>);
      } else if (level === 2) {
        blocks.push(
          <h3 id={id} key={`h-${index}`}>
            {title}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 id={id} key={`h-${index}`}>
            {title}
          </h4>,
        );
      }
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();
    blocks.push(<p key={`p-${index}`}>{renderInline(trimmed)}</p>);
  });

  flushList();
  flushTable();

  return <div className="markdown-reader">{blocks}</div>;
}

export function CodexPanel({ entries }: CodexPanelProps) {
  const [selectedId, setSelectedId] = useState(entries[0]?.id ?? "");
  const selectedEntry = entries.find((entry) => entry.id === selectedId) ?? entries[0];
  const preview = useMemo(() => markdownPreview(selectedEntry.content), [selectedEntry]);
  const headings = useMemo(() => extractHeadings(selectedEntry.content), [selectedEntry]);
  const wordCount = useMemo(() => countWords(selectedEntry.content), [selectedEntry]);

  return (
    <section className="codex-layout" aria-label="Codex de lore">
      <aside className="codex-sidebar">
        <div className="codex-tabs" role="tablist" aria-label="Documents">
          {entries.map((entry) => (
            <button
              aria-selected={entry.id === selectedEntry.id}
              className={entry.id === selectedEntry.id ? "active" : ""}
              key={entry.id}
              onClick={() => setSelectedId(entry.id)}
              role="tab"
              type="button"
            >
              <span>{entry.title}</span>
              <small>{entry.source}</small>
            </button>
          ))}
        </div>

        <div className="section-index">
          <p>Sommaire</p>
          {headings.slice(0, 14).map((heading) => (
            <a className={`level-${heading.level}`} href={`#${heading.id}`} key={heading.id}>
              {heading.title}
            </a>
          ))}
        </div>
      </aside>

      <article className="codex-document">
        <header className="codex-hero">
          <div>
            <p className="document-source">{selectedEntry.source}</p>
            <h2>{selectedEntry.title}</h2>
          </div>
          <div className="codex-stats" aria-label="Statistiques du document">
            <span>{headings.length} sections</span>
            <span>{wordCount.toLocaleString("fr-FR")} mots</span>
          </div>
        </header>

        <div className="codex-summary">
          <p>{preview}</p>
        </div>

        <MarkdownReader markdown={selectedEntry.content} />
      </article>
    </section>
  );
}
