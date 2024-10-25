function SlowComponent() {
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => {
        <li key={i}>
          {i} : {word}
        </li>;
      })}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}

function List() {
  const { posts } = usePosts();

  return (
    <>
      <ul>
        {posts.map((post, i) => {
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>;
        })}
      </ul>

      <Test />
    </>
  );
}

const Archive = memo(function Archive({ archiveOptions, onAddPosts }) {
  const [posts] = useState(() =>
    Array.from({ length: 30000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(archiveOptions.show);

  return (
    <aside>
      <h2>{archiveOptions.title}</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archived posts" : "Show archived posts"}
      </button>

      {showArchive && (
        <ul>
          <p>
            <strong>{post.title}:</strong> {post.body}
          </p>
          <button onClick={() => onAddPosts(post)}>Add as new post</button>
        </ul>
      )}
    </aside>
  );
});
