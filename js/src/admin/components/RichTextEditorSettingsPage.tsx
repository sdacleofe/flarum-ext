import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';

export default class RichTextEditorSettingsPage extends ExtensionPage {
  content() {
    return (
      <div className="RichTextEditorSettingsPage">
        <div className="container">
          <div className="Form">
            <div className="Form-group">
              <label>{app.translator.trans('rich-text-editor.admin.enable_label')}</label>
              <div>
                {Switch.component({
                  state: this.setting('rich-text-editor.enabled')() === '1',
                  onchange: (value: boolean) => {
                    this.setting('rich-text-editor.enabled')(value ? '1' : '0');
                  },
                  children: app.translator.trans('rich-text-editor.admin.enable_description')
                })}
              </div>
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('rich-text-editor.admin.toolbar_label')}</label>
              <div>
                {Select.component({
                  value: this.setting('rich-text-editor.toolbar')(),
                  options: {
                    'minimal': app.translator.trans('rich-text-editor.admin.toolbar_minimal'),
                    'basic': app.translator.trans('rich-text-editor.admin.toolbar_basic'),
                    'full': app.translator.trans('rich-text-editor.admin.toolbar_full')
                  },
                  onchange: this.setting('rich-text-editor.toolbar')
                })}
              </div>
              <div className="helpText">
                {app.translator.trans('rich-text-editor.admin.toolbar_description')}
              </div>
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('rich-text-editor.admin.theme_label')}</label>
              <div>
                {Select.component({
                  value: this.setting('rich-text-editor.theme')(),
                  options: {
                    'snow': app.translator.trans('rich-text-editor.admin.theme_snow'),
                    'bubble': app.translator.trans('rich-text-editor.admin.theme_bubble')
                  },
                  onchange: this.setting('rich-text-editor.theme')
                })}
              </div>
              <div className="helpText">
                {app.translator.trans('rich-text-editor.admin.theme_description')}
              </div>
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('rich-text-editor.admin.plugins_label')}</label>
              <div className="RichTextEditor-plugins">
                {this.renderPluginToggles()}
              </div>
              <div className="helpText">
                {app.translator.trans('rich-text-editor.admin.plugins_description')}
              </div>
            </div>

            <div className="Form-group">
              {Button.component({
                type: 'submit',
                className: 'Button Button--primary',
                children: app.translator.trans('core.admin.basics.saved_message'),
                onclick: this.saveSettings.bind(this)
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPluginToggles() {
    const availablePlugins = [
      'syntax-highlighting',
      'image-resize',
      'table',
      'video-embed',
      'emoji'
    ];

    const enabledPlugins = JSON.parse(this.setting('rich-text-editor.plugins')() || '[]');

    return availablePlugins.map(plugin => (
      <div className="Form-group" key={plugin}>
        {Switch.component({
          state: enabledPlugins.includes(plugin),
          onchange: (value: boolean) => {
            let plugins = [...enabledPlugins];
            if (value && !plugins.includes(plugin)) {
              plugins.push(plugin);
            } else if (!value && plugins.includes(plugin)) {
              plugins = plugins.filter(p => p !== plugin);
            }
            this.setting('rich-text-editor.plugins')(JSON.stringify(plugins));
          },
          children: app.translator.trans(`rich-text-editor.admin.plugin_${plugin.replace('-', '_')}`)
        })}
      </div>
    ));
  }

  saveSettings() {
    this.loading = true;
    
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/settings',
      body: {
        data: this.settings
      }
    }).then(() => {
      this.loading = false;
      app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.basics.saved_message'));
    }).catch(() => {
      this.loading = false;
    });
  }
}
