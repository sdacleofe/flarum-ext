import Component, { ComponentAttrs } from 'flarum/common/Component';
import { Vnode } from 'mithril';

interface RichTextEditorAttrs extends ComponentAttrs {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onchange?: (value: string) => void;
  onsubmit?: () => void;
  settings?: {
    toolbar: string;
    theme: string;
    plugins: string[];
  };
}

export default class RichTextEditor extends Component<RichTextEditorAttrs> {
  private quill: any = null;
  private element!: HTMLElement;

  view(): Vnode {
    return m('div.RichTextEditor', [
      m('div.RichTextEditor-toolbar', { id: this.elementId('toolbar') }),
      m('div.RichTextEditor-content', { 
        id: this.elementId('editor'),
        placeholder: this.attrs.placeholder || 'Write your message...'
      })
    ]);
  }

  oncreate(vnode: any) {
    super.oncreate(vnode);
    
    this.element = vnode.dom as HTMLElement;
    this.initializeEditor();
  }

  onremove() {
    if (this.quill) {
      this.quill = null;
    }
  }

  private async initializeEditor() {
    // Import Quill dynamically to avoid bundling issues
    const { default: Quill } = await import('quill');
    
    const editorElement = this.element.querySelector(`#${this.elementId('editor')}`) as HTMLElement;
    const toolbarElement = this.element.querySelector(`#${this.elementId('toolbar')}`) as HTMLElement;

    const toolbarConfig = this.getToolbarConfig();
    
    this.quill = new Quill(editorElement, {
      theme: this.attrs.settings?.theme || 'snow',
      modules: {
        toolbar: {
          container: toolbarElement,
          handlers: {
            'image': this.handleImageUpload.bind(this),
            'link': this.handleLinkInsert.bind(this)
          }
        }
      },
      placeholder: this.attrs.placeholder || 'Write your message...',
      readOnly: this.attrs.disabled || false
    });

    // Custom toolbar
    this.setupCustomToolbar(toolbarElement, toolbarConfig);

    // Set initial value
    if (this.attrs.value) {
      this.quill.root.innerHTML = this.attrs.value;
    }

    // Handle content changes
    this.quill.on('text-change', () => {
      const content = this.quill.root.innerHTML;
      if (this.attrs.onchange) {
        this.attrs.onchange(content);
      }
    });

    // Handle enter key for submission
    this.quill.keyboard.addBinding({
      key: 'Enter',
      ctrlKey: true
    }, () => {
      if (this.attrs.onsubmit) {
        this.attrs.onsubmit();
      }
    });
  }

  private getToolbarConfig() {
    const toolbarType = this.attrs.settings?.toolbar || 'full';
    
    switch (toolbarType) {
      case 'minimal':
        return [
          ['bold', 'italic'],
          ['link']
        ];
      case 'basic':
        return [
          ['bold', 'italic', 'underline'],
          ['link', 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }]
        ];
      default: // full
        return [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image', 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['clean']
        ];
    }
  }

  private setupCustomToolbar(toolbar: HTMLElement, config: any[]) {
    // Create custom toolbar buttons
    const toolbarHTML = this.generateToolbarHTML(config);
    toolbar.innerHTML = toolbarHTML;

    // Add event listeners for custom buttons
    toolbar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('[data-action]') as HTMLElement;
      
      if (button) {
        this.handleToolbarAction(button.dataset.action!);
      }
    });
  }

  private generateToolbarHTML(config: any[]): string {
    let html = '<div class="ql-toolbar">';
    
    config.forEach(group => {
      html += '<span class="ql-formats">';
      
      group.forEach((item: any) => {
        if (typeof item === 'string') {
          html += `<button class="ql-${item}" data-action="${item}"></button>`;
        } else if (typeof item === 'object') {
          const key = Object.keys(item)[0];
          const values = item[key];
          
          if (Array.isArray(values)) {
            html += `<select class="ql-${key}" data-action="${key}">`;
            values.forEach(value => {
              html += `<option value="${value}">${value || 'Normal'}</option>`;
            });
            html += '</select>';
          }
        }
      });
      
      html += '</span>';
    });
    
    html += '</div>';
    return html;
  }

  private handleToolbarAction(action: string) {
    if (!this.quill) return;

    switch (action) {
      case 'bold':
        this.quill.format('bold', !this.quill.getFormat().bold);
        break;
      case 'italic':
        this.quill.format('italic', !this.quill.getFormat().italic);
        break;
      case 'underline':
        this.quill.format('underline', !this.quill.getFormat().underline);
        break;
      case 'link':
        this.handleLinkInsert();
        break;
      case 'image':
        this.handleImageUpload();
        break;
      default:
        // Handle other formatting options
        const format = this.quill.getFormat();
        this.quill.format(action, !format[action]);
    }
  }

  private handleLinkInsert() {
    const url = prompt('Enter link URL:');
    if (url && this.quill) {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertText(range.index, url, 'link', url);
      }
    }
  }

  private handleImageUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file && this.quill) {
        // In a real implementation, you'd upload this to your server
        // For now, we'll create a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.insertEmbed(range.index, 'image', e.target?.result);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    input.click();
  }

  private elementId(suffix: string): string {
    return `rich-text-editor-${this.attrs.id || 'default'}-${suffix}`;
  }

  getValue(): string {
    return this.quill ? this.quill.root.innerHTML : '';
  }

  setValue(value: string) {
    if (this.quill) {
      this.quill.root.innerHTML = value;
    }
  }

  focus() {
    if (this.quill) {
      this.quill.focus();
    }
  }
}

  oncreate(vnode: Mithril.VnodeDOM) {
    super.oncreate(vnode);
    
    this.element = vnode.dom as HTMLElement;
    this.initializeEditor();
  }

  onremove() {
    if (this.quill) {
      this.quill = null;
    }
  }

  private initializeEditor() {
    const editorElement = this.element.querySelector(`#${this.elementId('editor')}`) as HTMLElement;
    const toolbarElement = this.element.querySelector(`#${this.elementId('toolbar')}`) as HTMLElement;

    const toolbarConfig = this.getToolbarConfig();
    
    this.quill = new Quill(editorElement, {
      theme: this.attrs.settings?.theme || 'snow',
      modules: {
        toolbar: {
          container: toolbarElement,
          handlers: {
            'image': this.handleImageUpload.bind(this),
            'link': this.handleLinkInsert.bind(this)
          }
        }
      },
      placeholder: this.attrs.placeholder || 'Write your message...',
      readOnly: this.attrs.disabled || false
    });

    // Custom toolbar
    this.setupCustomToolbar(toolbarElement, toolbarConfig);

    // Set initial value
    if (this.attrs.value) {
      this.quill.root.innerHTML = this.attrs.value;
    }

    // Handle content changes
    this.quill.on('text-change', () => {
      const content = this.quill.root.innerHTML;
      if (this.attrs.onchange) {
        this.attrs.onchange(content);
      }
    });

    // Handle enter key for submission
    this.quill.keyboard.addBinding({
      key: 'Enter',
      ctrlKey: true
    }, () => {
      if (this.attrs.onsubmit) {
        this.attrs.onsubmit();
      }
    });
  }

  private getToolbarConfig() {
    const toolbarType = this.attrs.settings?.toolbar || 'full';
    
    switch (toolbarType) {
      case 'minimal':
        return [
          ['bold', 'italic'],
          ['link']
        ];
      case 'basic':
        return [
          ['bold', 'italic', 'underline'],
          ['link', 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }]
        ];
      default: // full
        return [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image', 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['clean']
        ];
    }
  }

  private setupCustomToolbar(toolbar: HTMLElement, config: any[]) {
    // Create custom toolbar buttons
    const toolbarHTML = this.generateToolbarHTML(config);
    toolbar.innerHTML = toolbarHTML;

    // Add event listeners for custom buttons
    toolbar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('[data-action]') as HTMLElement;
      
      if (button) {
        this.handleToolbarAction(button.dataset.action!);
      }
    });
  }

  private generateToolbarHTML(config: any[]): string {
    let html = '<div class="ql-toolbar">';
    
    config.forEach(group => {
      html += '<span class="ql-formats">';
      
      group.forEach((item: any) => {
        if (typeof item === 'string') {
          html += `<button class="ql-${item}" data-action="${item}"></button>`;
        } else if (typeof item === 'object') {
          const key = Object.keys(item)[0];
          const values = item[key];
          
          if (Array.isArray(values)) {
            html += `<select class="ql-${key}" data-action="${key}">`;
            values.forEach(value => {
              html += `<option value="${value}">${value || 'Normal'}</option>`;
            });
            html += '</select>';
          }
        }
      });
      
      html += '</span>';
    });
    
    html += '</div>';
    return html;
  }

  private handleToolbarAction(action: string) {
    switch (action) {
      case 'bold':
        this.quill.format('bold', !this.quill.getFormat().bold);
        break;
      case 'italic':
        this.quill.format('italic', !this.quill.getFormat().italic);
        break;
      case 'underline':
        this.quill.format('underline', !this.quill.getFormat().underline);
        break;
      case 'link':
        this.handleLinkInsert();
        break;
      case 'image':
        this.handleImageUpload();
        break;
      default:
        // Handle other formatting options
        const format = this.quill.getFormat();
        this.quill.format(action, !format[action]);
    }
  }

  private handleLinkInsert() {
    const url = prompt('Enter link URL:');
    if (url) {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertText(range.index, url, 'link', url);
      }
    }
  }

  private handleImageUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) {
        // In a real implementation, you'd upload this to your server
        // For now, we'll create a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.insertEmbed(range.index, 'image', e.target?.result);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    input.click();
  }

  private elementId(suffix: string): string {
    return `rich-text-editor-${this.attrs.id || 'default'}-${suffix}`;
  }

  getValue(): string {
    return this.quill ? this.quill.root.innerHTML : '';
  }

  setValue(value: string) {
    if (this.quill) {
      this.quill.root.innerHTML = value;
    }
  }

  focus() {
    if (this.quill) {
      this.quill.focus();
    }
  }
}
