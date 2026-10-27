Popover menu list (kebab menus, pickers); MenuTrigger wires open/close around any trigger.

~~~jsx
<MenuTrigger trigger={<IconButton icon="ellipsis-vertical" size="sm" label="More" />} items={[{ label: 'Edit', icon: 'pencil' }, '-', { label: 'Delete', icon: 'trash-2', danger: true }]} />
~~~

Destructive item last, after a separator, in coral.
