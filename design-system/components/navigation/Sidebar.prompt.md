Full desktop sidebar: wordmark, primary action, labelled sections divided by hairlines, footer items.

~~~jsx
<Sidebar activeId="home" sections={[{ label: 'Main', items: [{ id: 'home', label: 'Home', icon: 'house' }] }]} footer={[{ id: 'settings', label: 'Settings', icon: 'settings' }]} />
~~~

248px wide. On mobile render it inside a drawer — same component.
