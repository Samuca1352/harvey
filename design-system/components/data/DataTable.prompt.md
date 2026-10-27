Row-card table: tiny header, each row a rounded gray-50 strip; columns can render custom cells.

~~~jsx
<DataTable columns={[{ key: 'name', label: 'Agent', width: '2fr' }, { key: 'tasks', label: 'Tasks' }]} rows={rows} />
~~~

On phones, prefer a stacked ActionRow list (see UI kit mobile Home).
