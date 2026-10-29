export function Footer() {
  return (
    <footer className="game-over">
      <p>THANKS FOR PLAYING ♥ INSERT COIN TO CONTINUE</p>
      <a className="start-btn" href="#home">
        Restart
      </a>
      <p>
        <a href="/resume.pdf">Download resume</a>
      </p>
      <p className="fine">© {new Date().getFullYear()} Vanshika Nimwal · original pixel art · Player 02</p>
    </footer>
  );
}
