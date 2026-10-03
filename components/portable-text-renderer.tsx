import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          marginTop: "3rem",
          marginBottom: "1.1rem",
          color: "#092c40",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "clamp(1.3rem, 2.5vw, 1.55rem)",
          fontWeight: 700,
          lineHeight: 1.35,
          letterSpacing: "-0.015em",
          marginTop: "2.25rem",
          marginBottom: "0.85rem",
          color: "#092c40",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontSize: "1.2rem",
          fontWeight: 600,
          lineHeight: 1.4,
          marginTop: "1.75rem",
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
          lineHeight: 1.85,
          marginBottom: "1.65rem",
          color: "#334155",
          letterSpacing: "-0.005em",
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid #38b3ed",
          background: "linear-gradient(135deg, rgba(240, 248, 252, 0.75) 0%, rgba(255, 255, 255, 0.9) 100%)",
          padding: "1.35rem 1.75rem",
          borderRadius: "0 12px 12px 0",
          fontStyle: "italic",
          fontSize: "1.18rem",
          lineHeight: 1.7,
          color: "#092c40",
          margin: "2.25rem 0",
          boxShadow: "0 4px 16px -2px rgba(9, 44, 64, 0.04), 0 0 0 1px rgba(56, 179, 237, 0.15)",
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
          marginBottom: "1.75rem",
          fontSize: "1.125rem",
          lineHeight: 1.85,
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
          marginBottom: "1.75rem",
          fontSize: "1.125rem",
          lineHeight: 1.85,
          color: "#334155",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "0.6rem" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "0.6rem" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 700, color: "#092c40" }}>{children}</strong>
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
          color: "#092c40",
          padding: "0.2rem 0.45rem",
          borderRadius: "6px",
          fontFamily: "monospace",
          fontSize: "0.9em",
          border: "1px solid rgba(209, 225, 234, 0.6)",
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
            color: "#087eae",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            fontWeight: 600,
            transition: "color 0.2s ease",
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
        <figure style={{ margin: "2.75rem 0" }}>
          <img
            src={imgUrl}
            alt={value.alt || ""}
            loading="lazy"
            style={{
              width: "100%",
              borderRadius: "14px",
              boxShadow: "0 8px 24px -4px rgba(9, 44, 64, 0.1), 0 0 0 1px rgba(9, 44, 64, 0.05)",
              display: "block",
            }}
          />
          {value.caption && (
            <figcaption
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
                color: "#64748b",
                marginTop: "0.75rem",
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
          margin: "2.25rem 0",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#092c40",
          color: "#f8fafc",
          border: "1px solid #163e56",
          boxShadow: "0 8px 24px -4px rgba(9, 44, 64, 0.15)",
        }}
      >
        {value.filename && (
          <div
            style={{
              padding: "0.6rem 1.25rem",
              background: "#061f2e",
              borderBottom: "1px solid #163e56",
              fontSize: "0.78rem",
              fontFamily: "monospace",
              color: "#94a3b8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{value.filename}</span>
            <span style={{ textTransform: "uppercase", fontSize: "0.7rem", color: "#38b3ed" }}>
              {value.language}
            </span>
          </div>
        )}
        <pre
          style={{
            padding: "1.25rem 1.5rem",
            margin: 0,
            overflowX: "auto",
            fontSize: "0.92rem",
            fontFamily: "monospace",
            lineHeight: 1.65,
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
