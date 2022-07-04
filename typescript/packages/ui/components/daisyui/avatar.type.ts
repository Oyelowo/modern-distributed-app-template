type Component = 'avatar' | "avatar-group";
type Modifier = 'online' | 'offline' | 'placeholder';
type Responsive = "";

export type AvatarClass = Component | Modifier | Responsive;

// { type: 'component', class: 'avatar', desc: 'Container element' },
// { type: 'component', class: 'avatar-group', desc: 'Container for grouping multiple avatars' },
// { type: 'modifier', class: 'online', desc: 'shows a green dot as online indicator' },
// { type: 'modifier', class: 'offline', desc: 'shows a gray dot as online indicator' },
// { type: 'modifier', class: 'placeholder', desc: 'to show some letters as avatar placeholder' },
