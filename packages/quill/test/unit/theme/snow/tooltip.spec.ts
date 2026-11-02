import { describe, expect, test } from 'vitest';
import Quill from '../../../../src/quill.js';

describe('SnowTooltip', () => {
  const setup = (href: string) => {
    const container = document.body.appendChild(document.createElement('div'));
    const quill = new Quill(container, { theme: 'snow' });
    quill.setText('link\n');
    quill.formatText(0, 4, 'link', 'https://example.com');
    quill.root.querySelector('a')?.setAttribute('href', href);
    quill.setSelection(2, 0, Quill.sources.USER);
    return quill.container.querySelector('a.ql-preview') as HTMLAnchorElement;
  };

  test('previews safe link', () => {
    const preview = setup('https://example.com/page');
    expect(preview.getAttribute('href')).toEqual('https://example.com/page');
    expect(preview.textContent).toEqual('https://example.com/page');
  });

  test('sanitizes unsafe link preview', () => {
    const preview = setup('javascript:alert(1)');
    expect(preview.getAttribute('href')).toEqual('about:blank');
  });
});
