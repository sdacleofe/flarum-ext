<?php

namespace YourVendor\RichTextEditor;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->serializeToForum('richTextEditor.enabled', 'rich-text-editor.enabled', 'boolval', true)
        ->serializeToForum('richTextEditor.toolbar', 'rich-text-editor.toolbar', null, 'full')
        ->serializeToForum('richTextEditor.theme', 'rich-text-editor.theme', null, 'default'),

    (new Extend\ApiSerializer(\Flarum\Api\Serializer\ForumSerializer::class))
        ->attributes(Serializer\ForumSerializer::class),
];
