declare global {
  const app: any;
  const m: any;
}

declare module 'flarum/admin/app' {
  const app: any;
  export default app;
}

declare module 'flarum/forum/app' {
  const app: any;
  export default app;
}

declare module 'flarum/common/Component' {
  export interface ComponentAttrs {
    [key: string]: any;
  }
  
  export default class Component<T = {}> {
    attrs: T;
    oncreate(vnode: any): void;
    onremove(): void;
    view(): any;
  }
}

declare module 'flarum/admin/components/ExtensionPage' {
  import Component from 'flarum/common/Component';
  
  export default class ExtensionPage extends Component {
    setting(key: string): any;
    settings: any;
    loading: boolean;
  }
}

declare module 'flarum/common/components/Switch' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/common/components/Select' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/common/components/Button' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/common/components/TextEditor' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/forum/components/CommentPost' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/forum/components/ComposerBody' {
  import Component from 'flarum/common/Component';
  export default Component;
}

declare module 'flarum/common/extend' {
  export function extend(prototype: any, method: string, callback: Function): void;
}

declare module 'mithril' {
  export interface Vnode {
    tag: string;
    attrs: any;
    children: any;
  }
}

export {};
