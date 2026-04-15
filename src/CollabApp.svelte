<script lang="ts">
  interface Message {
    id: number;
    user: string;
    text: string;
    time: string;
    avatar: string;
    type: 'chat' | 'system';
  }

  interface Activity {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
    icon: string;
  }

  let activeTab: 'chat' | 'activity' = 'chat';

  let messages: Message[] = [
    { id: 1, user: 'Sarah', text: 'Just uploaded the new hero images to the media library!', time: '10:42 AM', avatar: 'S', type: 'chat' },
    { id: 2, user: 'Mike', text: 'Great. I\'m finishing the editorial piece on microfrontends. Will publish by EOD.', time: '10:45 AM', avatar: 'M', type: 'chat' },
    { id: 3, user: 'System', text: 'Auth roles updated — 3 new users added to Editor group', time: '10:47 AM', avatar: '⚙', type: 'system' },
    { id: 4, user: 'You', text: 'I updated the auth roles for the new team members. Refresh your dashboard!', time: '10:48 AM', avatar: 'A', type: 'chat' },
  ];

  const activities: Activity[] = [
    { id: 1, user: 'Sarah', action: 'uploaded', target: '12 media assets', time: '10 min ago', icon: '🖼️' },
    { id: 2, user: 'Mike', action: 'saved draft', target: '"Microfrontend Deep Dive"', time: '22 min ago', icon: '📝' },
    { id: 3, user: 'You', action: 'updated roles', target: 'Editor group — 3 users', time: '35 min ago', icon: '🔐' },
    { id: 4, user: 'James', action: 'published', target: '"Getting Started Guide"', time: '1 hr ago', icon: '🚀' },
    { id: 5, user: 'Sarah', action: 'commented on', target: '"Vue Media Library"', time: '2 hr ago', icon: '💬' },
  ];

  let newMessage: string = '';
  const onlineUsers = ['S', 'M', 'J', 'R', 'A'];

  function sendMessage(): void {
    if (!newMessage.trim()) return;
    messages = [...messages, {
      id: Date.now(),
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'A',
      type: 'chat',
    }];
    newMessage = '';
  }

  function handleKey(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="animate-in">
  <header style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
    <div>
      <h2 class="vibrant-text" style="font-size: 2rem;">Collaboration Hub</h2>
      <p style="color: var(--text-muted); margin-top: 0.25rem;">Real-time team communication · Svelte + TypeScript</p>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 0.75rem; color: var(--text-muted);">Online:</span>
      <div style="display: flex;">
        {#each onlineUsers as user, i}
          <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--{i % 2 === 0 ? 'primary' : 'secondary'}); border: 2px solid var(--bg-darker); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; margin-left: {i > 0 ? '-8px' : '0'};">{user}</div>
        {/each}
      </div>
      <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
      <span style="font-size: 0.75rem; color: #10b981; font-weight: 600;">5 online</span>
    </div>
  </header>

  <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
    <button class="glass-btn {activeTab === 'chat' ? 'active' : ''}" on:click={() => activeTab = 'chat'}>💬 Team Chat</button>
    <button class="glass-btn {activeTab === 'activity' ? 'active' : ''}" on:click={() => activeTab = 'activity'}>📊 Activity Feed</button>
  </div>

  {#if activeTab === 'chat'}
    <div class="card" style="display: flex; flex-direction: column; height: 520px; padding: 0; overflow: hidden;">
      <div style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        {#each messages as msg (msg.id)}
          {#if msg.type === 'system'}
            <div style="text-align: center;">
              <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 0.25rem 1rem; border-radius: 999px; border: 1px solid var(--border);">⚙ {msg.text} · {msg.time}</span>
            </div>
          {:else}
            <div style="display: flex; gap: 1rem; align-items: flex-start; {msg.user === 'You' ? 'flex-direction: row-reverse' : ''}">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: {msg.user === 'You' ? 'var(--primary)' : 'var(--glass)'}; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.875rem;">{msg.avatar}</div>
              <div style="max-width: 70%;">
                <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem; {msg.user === 'You' ? 'justify-content: flex-end' : ''}">
                  <span style="font-size: 0.85rem; font-weight: 600;">{msg.user}</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">{msg.time}</span>
                </div>
                <div style="background: {msg.user === 'You' ? 'var(--primary)' : 'var(--glass)'}; padding: 0.75rem 1rem; border-radius: {msg.user === 'You' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'}; border: 1px solid var(--border); font-size: 0.9rem; line-height: 1.5;">{msg.text}</div>
              </div>
            </div>
          {/if}
        {/each}
      </div>

      <div style="padding: 1.25rem; border-top: 1px solid var(--border);">
        <form on:submit|preventDefault={sendMessage} style="display: flex; gap: 0.75rem;">
          <input
            bind:value={newMessage}
            on:keydown={handleKey}
            type="text"
            placeholder="Type a message... (Enter to send)"
            style="flex: 1; padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 0.5rem; color: var(--text-main); font-family: inherit; font-size: 0.9rem; outline: none;"
          >
          <button type="submit" class="glass-btn active" style="padding: 0.75rem 1.25rem; flex-shrink: 0;">Send ↑</button>
        </form>
      </div>
    </div>
  {/if}

  {#if activeTab === 'activity'}
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      {#each activities as act (act.id)}
        <div class="card" style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 42px; height: 42px; border-radius: 0.75rem; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">{act.icon}</div>
          <div style="flex: 1;">
            <p style="font-size: 0.9rem;"><strong>{act.user}</strong> <span style="color: var(--text-muted);">{act.action}</span> {act.target}</p>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">{act.time}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
</style>
