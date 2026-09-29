import React from "react";
import Hero from "../components/Hero";
import { ARTICLE } from "../constants/article";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import MdxContent from "../../content/age-friendly-dropdowns.mdx";
import mdxComponents from "../mdx/components";

export function ArticlePage() {
  useDocumentTitle(`${ARTICLE.title} — ${ARTICLE.author}`);

  return (
    <div className="min-h-screen bg-surface text-gray-200">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-slate-800 focus:px-3 focus:py-2">Skip to content</a>

      <Hero title={ARTICLE.title} deck={ARTICLE.deck} author={ARTICLE.author} dateISO={ARTICLE.dateISO} />

      <main id="content" className="container-app py-8">
        <article className="prose">
          <MdxContent components={mdxComponents as any} />
        </article>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {ARTICLE.author}. All rights reserved.
      </footer>
    </div>
  );
}

export default ArticlePage;

