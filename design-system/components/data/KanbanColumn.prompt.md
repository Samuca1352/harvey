Board column/group: status square, title, count, add button; children are TaskCards.

~~~jsx
<KanbanColumn status="running" title="Running" count={2}><TaskCard … /></KanbanColumn>
~~~

Follow each column with <Button variant="soft" block iconLeft="plus">Add Task</Button>.
