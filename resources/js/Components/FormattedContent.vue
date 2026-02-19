<template>
  <div
    class="formatted-content font-rubik text-grayish-blue"
    v-html="formattedHtml"
  />
</template>

<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const ALLOWED = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'code', 'pre',
    'ul', 'ol', 'li', 'blockquote', 'a', 'h1', 'h2', 'h3', 'h4', 'hr',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
};

export default {
  name: 'FormattedContent',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return { formattedHtml: '' };
  },
  watch: {
    content: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.formattedHtml = '';
          return;
        }
        try {
          const raw = marked.parse(value, { async: false });
          this.formattedHtml = DOMPurify.sanitize(String(raw ?? ''), ALLOWED);
        } catch {
          const escaped = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          this.formattedHtml = DOMPurify.sanitize(escaped, ALLOWED);
        }
      },
    },
  },
};
</script>

<style scoped>
.formatted-content :deep(p) {
  margin-bottom: 0.5em;
}
.formatted-content :deep(p:last-child) {
  margin-bottom: 0;
}
.formatted-content :deep(strong),
.formatted-content :deep(b) {
  font-weight: 700;
  color: inherit;
}
.formatted-content :deep(em),
.formatted-content :deep(i) {
  font-style: italic;
}
.formatted-content :deep(u) {
  text-decoration: underline;
}
.formatted-content :deep(s) {
  text-decoration: line-through;
}
.formatted-content :deep(code) {
  font-family: ui-monospace, monospace;
  font-size: 0.9em;
  padding: 0.15em 0.35em;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
}
.formatted-content :deep(pre) {
  margin: 0.75em 0;
  padding: 1em;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
  overflow-x: auto;
}
.formatted-content :deep(pre code) {
  padding: 0;
  background: none;
}
.formatted-content :deep(ul),
.formatted-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}
.formatted-content :deep(ul) {
  list-style-type: disc;
}
.formatted-content :deep(ol) {
  list-style-type: decimal;
}
.formatted-content :deep(li) {
  margin: 0.25em 0;
}
.formatted-content :deep(blockquote) {
  margin: 0.75em 0;
  padding-left: 1em;
  border-left: 4px solid #5357b6;
  color: inherit;
  opacity: 0.9;
}
.formatted-content :deep(a) {
  color: #5357b6;
  text-decoration: underline;
}
.formatted-content :deep(a:hover) {
  text-decoration: none;
}
.formatted-content :deep(h1) { font-size: 1.35em; font-weight: 700; margin: 0.75em 0 0.35em; }
.formatted-content :deep(h2) { font-size: 1.2em; font-weight: 700; margin: 0.65em 0 0.3em; }
.formatted-content :deep(h3) { font-size: 1.1em; font-weight: 600; margin: 0.55em 0 0.25em; }
.formatted-content :deep(h4) { font-size: 1em; font-weight: 600; margin: 0.5em 0 0.2em; }
.formatted-content :deep(hr) {
  margin: 1em 0;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
