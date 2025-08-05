<?php

namespace YourVendor\RichTextEditor\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumSerializer
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke($serializer, $model, $attributes)
    {
        $attributes['richTextEditorSettings'] = [
            'enabled' => $this->settings->get('rich-text-editor.enabled', true),
            'toolbar' => $this->settings->get('rich-text-editor.toolbar', 'full'),
            'theme' => $this->settings->get('rich-text-editor.theme', 'default'),
            'plugins' => json_decode($this->settings->get('rich-text-editor.plugins', '[]'), true),
        ];

        return $attributes;
    }
}
