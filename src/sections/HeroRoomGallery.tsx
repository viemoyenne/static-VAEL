import { useEffect, useRef, useCallback } from 'react';
import { heroConfig } from '../config';

export default function HeroRoomGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const roomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    current: 0,
    isMoving: false,
    mouseEnabled: true,
  });

  const rooms = heroConfig.rooms;

  const applyRoomTransform = useCallback(
    (transform: { translateX?: string; translateY?: string; translateZ?: string; rotX?: string; rotY?: string }) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const tx = transform.translateX || '0';
      const ty = transform.translateY || '0';
      const tz = transform.translateZ || '0';
      const rx = transform.rotX || '0';
      const ry = transform.rotY || '0';
      scroller.style.transform = `translate3d(${tx}, ${ty}, ${tz}) rotate3d(1,0,0,${rx}deg) rotate3d(0,1,0,${ry}deg)`;
    },
    []
  );

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      const state = stateRef.current;
      if (state.isMoving) return;
      state.isMoving = true;

      const scroller = scrollerRef.current;
      const overlay = overlayRef.current;
      const subtitle = subtitleRef.current;
      if (!scroller || !overlay || !subtitle) {
        state.isMoving = false;
        return;
      }

      const prevIndex = state.current;
      const total = rooms.length;
      const nextIndex =
        direction === 'next'
          ? (prevIndex + 1) % total
          : (prevIndex - 1 + total) % total;

      const prevRoom = roomRefs.current[prevIndex];
      const nextRoom = roomRefs.current[nextIndex];
      if (!prevRoom || !nextRoom) {
        state.isMoving = false;
        return;
      }

      // First-person viewing turn at the same spot: the camera pivots
      // around its own central vertical axis — like a visitor turning
      // inside the gallery — in the direction of the arrow pressed.
      // "next" (right arrow) turns the gaze rightward; "prev" turns it
      // leftward. Both rooms share the pivot point, so the outgoing view
      // sweeps off to one side while the incoming view sweeps in from
      // the other — one continuous turn, the viewer never moves.
      const TURN_DEG = 75;      // gaze swing amplitude — a real viewing turn
      const CROSSFADE_MS = 800; // duration of the turn
      const sgn = direction === 'next' ? -1 : 1;

      // Incoming room waits on the side the gaze is turning toward
      nextRoom.style.transition = 'none';
      nextRoom.style.transform = 'translate3d(0,0,0)';
      nextRoom.style.opacity = '0';
      nextRoom.classList.add('room--current');

      // Begin the pivot: gaze sweeps across the room in the navigation
      // direction, the view panning past the side wall as it turns
      scroller.style.transition = `transform ${CROSSFADE_MS}ms cubic-bezier(0.45, 0.05, 0.35, 1)`;
      applyRoomTransform({ translateZ: '-200px', rotY: String(sgn * TURN_DEG) });

      // Crossfade through the turn: old view leaves with the sweep,
      // new view arrives with it — the scene never empties
      prevRoom.style.transition = `opacity ${Math.round(CROSSFADE_MS * 0.55)}ms ease-in`;
      nextRoom.style.transition = `opacity ${Math.round(CROSSFADE_MS * 0.55)}ms ease-out ${Math.round(CROSSFADE_MS * 0.35)}ms`;
      void nextRoom.offsetWidth; // commit initial opacity 0 before fading in
      prevRoom.style.opacity = '0';
      nextRoom.style.opacity = '1';

      // Update subtitle and theme midway through the turn
      const room = rooms[nextIndex];
      setTimeout(() => {
        overlay.setAttribute('data-theme', room.theme);
        subtitle.style.opacity = '0';
        setTimeout(() => {
          subtitle.textContent = room.name;
          subtitle.style.opacity = '0.95';
        }, 150);
        // Replace the title block with a fresh element — the browser's
        // style engine can serve a stale cascade for mount-time elements
        // when only an ancestor attribute changes, so we re-create it.
        const block = overlay.querySelector('.archive-title-block');
        if (block) {
          const fresh = block.cloneNode(true) as HTMLElement;
          block.replaceWith(fresh);
        }
        const ink = room.theme === 'light' ? '#f0ede4' : '#f0ede4';
        overlay.querySelectorAll<HTMLElement>('.archive-title-kicker').forEach((el) => {
          el.style.color = ink;
          el.style.textShadow = room.theme === 'light' ? 'none' : '';
        });
        overlay.querySelectorAll<HTMLElement>('.archive-subtitle, .archive-meta').forEach((el) => {
          el.style.color = ink;
        });
      }, CROSSFADE_MS * 0.45);

      // Settle: gaze returns to center, stepping back into the room
      setTimeout(() => {
        prevRoom.classList.remove('room--current');
        nextRoom.style.transition = 'none';
        nextRoom.style.opacity = '1'; // hard-commit — never rely on a pending transition
        scroller.style.transition = `transform ${Math.round(CROSSFADE_MS * 0.7)}ms cubic-bezier(0.3, 0, 0.3, 1)`;
        applyRoomTransform({ translateZ: '500px', rotY: '0' });

        state.current = nextIndex;

        setTimeout(() => {
          scroller.style.transition = 'transform 0.3s ease-out';
          state.isMoving = false;
        }, Math.round(CROSSFADE_MS * 0.7) + 50);
      }, CROSSFADE_MS);
    },
    [applyRoomTransform, rooms]
  );

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller || rooms.length === 0) return;

    // Initialize first room
    const firstRoom = roomRefs.current[0];
    if (firstRoom) {
      firstRoom.classList.add('room--current');
      firstRoom.style.opacity = '1';
    }
    applyRoomTransform({ translateX: '0', translateY: '0', translateZ: '500px', rotX: '0', rotY: '0' });

    // Mouse tilt
    const handleMouseMove = (e: MouseEvent) => {
      const state = stateRef.current;
      if (state.isMoving || !state.mouseEnabled) return;

      const rotX = -(e.clientY / window.innerHeight - 0.5) * 4;
      const rotY = (e.clientX / window.innerWidth - 0.5) * 6;

      scroller.style.transform = `translate3d(0, 0, 500px) rotate3d(1,0,0,${rotX}deg) rotate3d(0,1,0,${rotY}deg)`;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, applyRoomTransform, rooms]);

  if (!heroConfig.mainTitle && rooms.length === 0) return null;

  return (
    <section id="hero" className="relative" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={containerRef} className="archive-container">
        <div ref={scrollerRef} className="archive-scroller">
          {rooms.map((room, i) => (
            <div
              key={room.name}
              ref={(el) => { roomRefs.current[i] = el; }}
              className={`room ${room.className}`}
            >
              <div className="room__side room__side--back">
                {/* 3D wainscot rail — extruded brass bar across the wall */}
                <div className="rail3d rail3d--back">
                  <div className="rail3d__face rail3d__face--front" />
                  <div className="rail3d__face rail3d__face--top" />
                </div>
                {/* 3D track lights above the centerpiece */}
                <div className="track3d track3d--back">
                  <div className="track3d__bar" />
                  <div className="track3d__head track3d__head--a"><i /></div>
                  <div className="track3d__head track3d__head--b"><i /></div>
                </div>
                {/* 3D sconce pair on the back wall */}
                <div className="sconce3d sconce3d--a"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                <div className="sconce3d sconce3d--b"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                {room.images.back.map((src, j) => (
                  <span key={j} className="art3d">
                    <img src={src} alt={room.name} loading="eager" />
                  </span>
                ))}
              </div>
              <div className="room__side room__side--left">
                <div className="rail3d rail3d--side">
                  <div className="rail3d__face rail3d__face--front" />
                  <div className="rail3d__face rail3d__face--top" />
                </div>
                <div className="sconce3d sconce3d--a"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                <div className="sconce3d sconce3d--b"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                {room.images.left.map((src, j) => (
                  <span key={j} className="art3d">
                    <img src={src} alt={room.name} loading="eager" />
                  </span>
                ))}
              </div>
              <div className="room__side room__side--right">
                <div className="rail3d rail3d--side">
                  <div className="rail3d__face rail3d__face--front" />
                  <div className="rail3d__face rail3d__face--top" />
                </div>
                <div className="sconce3d sconce3d--a"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                <div className="sconce3d sconce3d--b"><div className="sconce3d__shade" /><div className="sconce3d__stem" /></div>
                {room.images.right.map((src, j) => (
                  <span key={j} className="art3d">
                    <img src={src} alt={room.name} loading="eager" />
                  </span>
                ))}
              </div>
              <div className="room__side room__side--top">
                {/* 3D coffered skylight panel */}
                <div className="skylight3d">
                  <div className="skylight3d__pane" />
                  <div className="skylight3d__beam skylight3d__beam--h" />
                  <div className="skylight3d__beam skylight3d__beam--v" />
                </div>
              </div>
              <div className="room__side room__side--bottom" />
              {/* 3D gallery bench standing on the floor */}
              <div className="bench3d">
                <div className="bench3d__top" />
                <div className="bench3d__front" />
                <div className="bench3d__leg bench3d__leg--a" />
                <div className="bench3d__leg bench3d__leg--b" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div ref={overlayRef} className="archive-content" data-theme={rooms[0]?.theme || 'dark'}>
        {/* AR HUD layer — viewport brackets, scanline, reticle, readouts */}
        <div className="ar-hud" aria-hidden="true">
          <span className="ar-hud__corner ar-hud__corner--tl" />
          <span className="ar-hud__corner ar-hud__corner--tr" />
          <span className="ar-hud__corner ar-hud__corner--bl" />
          <span className="ar-hud__corner ar-hud__corner--br" />
          <div className="ar-hud__scanline" />
          <div className="ar-hud__readout ar-hud__readout--left">VAEL · AR VIEW</div>
          <div className="ar-hud__readout ar-hud__readout--right">SCAN 04 · GALLERY MODE</div>
        </div>

        {/* Navigation arrows */}
        <button
          className="nav-arrow nav-arrow--left"
          onClick={() => navigate('prev')}
          aria-label="Previous room"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="nav-arrow nav-arrow--right"
          onClick={() => navigate('next')}
          aria-label="Next room"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Title: kicker text + brand logo instead of typed "VAEL" */}
        {heroConfig.mainTitle && (
          <div className="archive-title-block">
            <div className="archive-title-kicker">Step Into The</div>
            <img
              className="archive-title-logo"
              src="images/vael-logo.png"
              alt="VAEL"
            />
          </div>
        )}
        <div ref={subtitleRef} className="archive-subtitle" style={{ opacity: 0.95 }}>
          {rooms[0]?.name || ''}
        </div>
        {heroConfig.metaLines.length > 0 && (
          <div className="archive-meta">
            {heroConfig.metaLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < heroConfig.metaLines.length - 1 && <br />}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
