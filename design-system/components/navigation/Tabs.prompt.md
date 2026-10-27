Segmented control for switching views (Board/List, Agent/Settings).

~~~jsx
<Tabs items={['Board','List']} value="Board" onChange={setView} />
~~~

Selected tab = white pill with hairline + xs shadow on a gray track.
