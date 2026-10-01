import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: 700,
          lineHeight: 1.3,
          marginTop: "2.5rem",
          marginBottom: "1rem",
          color: "#0f172a",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          lineHeight: 1.35,
          marginTop: "2rem",
          marginBottom: "0.75rem",
          color: "#0f172a",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
          color: "#1e293b",
        }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p
        style={{
          fontSize: "1.125rem",
          lineHeight: 1.8,
          marginBottom: "1.5rem",
          color: "#334155",
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid #f59e0b",
          background: "rgba(245, 158, 11, 0.06)",
          padding: "1rem 1.5rem",
          borderRadius: "0 8px 8px 0",
          fontStyle: "italic",
          fontSize: "1.2rem",
          lineHeight: 1.6,
          color: "#1e293b",
          margin: "2rem 0",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "1.75rem",
          marginBottom: "1.5rem",
          fontSize: "1.125rem",
          lineHeight: 1.8,
          color: "#334155",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          listStyleType: "decimal",
          paddingLeft: "1.75rem",
          marginBottom: "1.5rem",
          fontSize: "1.125rem",
          lineHeight: 1.8,
          color: "#334155",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 700, color: "#0f172a" }}>{children}</strong>
    ),
    em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
    underline: ({ children }) => (
      <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
        {children}
      </span>
    ),
    "strike-through": ({ children }) => (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    ),
    code: ({ children }) => (
      <code
        style={{
          background: "#f1f5f9",
          color: "#0f172a",
          padding: "0.2rem 0.4rem",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "0.9em",
        }}
      >
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isExternal = (value?.href || "").startsWith("http");
      return (
        <a
          href={value?.href}
          target={value?.blank || isExternal ? "_blank" : undefined}
          rel={value?.blank || isExternal ? "noopener noreferrer" : undefined}
          style={{
            color: "#0284c7",
            textDecoration: "underline",
            fontWeight: 500,
          }}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const imgUrl = urlForImage(value)?.width(1400).url();
      if (!imgUrl) return null;
      return (
        <figure style={{ margin: "2.5rem 0" }}>
          <img
            src={imgUrl}
            alt={value.alt || ""}
            loading="lazy"
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "block",
            }}
          />
          {value.caption && (
            <figcaption
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
                color: "#64748b",
                marginTop: "0.6rem",
                fontStyle: "italic",
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <div
        style={{
          margin: "2rem 0",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#0f172a",
          color: "#f8fafc",
          border: "1px solid #1e293b",
        }}
      >
        {value.filename && (
          <div
            style={{
              padding: "0.5rem 1rem",
              background: "#1e293b",
              borderBottom: "1px solid #334155",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: "#94a3b8",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{value.filename}</span>
            <span style={{ textTransform: "uppercase" }}>{value.language}</span>
          </div>
        )}
        <pre
          style={{
            padding: "1rem 1.25rem",
            margin: 0,
            overflowX: "auto",
            fontSize: "0.9rem",
            fontFamily: "monospace",
            lineHeight: 1.6,
          }}
        >
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
};

interface PortableTextRendererProps {
  value?: any;
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <p style={{ fontStyle: "italic", color: "#94a3b8" }}>No article content published yet.</p>;
  }

  return (
    <div className="article-portable-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
