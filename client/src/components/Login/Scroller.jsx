import { GridMotion } from "./GridMotion"

export function Scroller() {
  const items = [
    'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1623984109622-f9c970ba32fc?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://w0.peakpx.com/wallpaper/477/401/HD-wallpaper-thor-in-avengers-endgame-thumbnail.jpg',
    'https://i.pinimg.com/736x/1a/64/be/1a64bef864012a0e18eba552047a486a.jpg',
    'https://m.media-amazon.com/images/I/91wllJjzwTL.jpg',
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/hulk-in-avengers-age-of-ultron.jpg',
    'https://wallpapers.com/images/featured/avengers-endgame-pictures-b57d5f1vbatinwzv.jpg',
    'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1623984109622-f9c970ba32fc?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://w0.peakpx.com/wallpaper/477/401/HD-wallpaper-thor-in-avengers-endgame-thumbnail.jpg',
    'https://i.pinimg.com/736x/1a/64/be/1a64bef864012a0e18eba552047a486a.jpg',
    'https://m.media-amazon.com/images/I/91wllJjzwTL.jpg',
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/hulk-in-avengers-age-of-ultron.jpg',
    'https://wallpapers.com/images/featured/avengers-endgame-pictures-b57d5f1vbatinwzv.jpg',
    'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1623984109622-f9c970ba32fc?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://w0.peakpx.com/wallpaper/477/401/HD-wallpaper-thor-in-avengers-endgame-thumbnail.jpg',
    'https://i.pinimg.com/736x/1a/64/be/1a64bef864012a0e18eba552047a486a.jpg',
    'https://m.media-amazon.com/images/I/91wllJjzwTL.jpg',
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/hulk-in-avengers-age-of-ultron.jpg',
    'https://wallpapers.com/images/featured/avengers-endgame-pictures-b57d5f1vbatinwzv.jpg'
];

  return (
    <div className="space-y-8">
      {/* Default grid with system-generated items */}
      <div className="h-screen w-full bg-gradient-to-br from-background to-muted">
        <GridMotion />
      </div>

      {/* Custom grid with rich content */}
      <div className="h-screen w-full bg-gradient-to-br from-background to-muted">
        <GridMotion 
          items={items}
          gradientColor="hsl(var(--brand))"
          className="relative opacity-100"
        />
      </div>
      

      {/* Minimal grid with dark theme */}
      {/* <div className="h-screen w-full bg-black">
        <GridMotion 
          items={items.slice(0, 14)}
          gradientColor="hsl(var(--brand-foreground))"
          className="opacity-75"
        />
      </div> */}
    </div>
  )
}