import styles from './Bands.module.css';
import hamburger from './hamburger.png';
const Bands = () => {
  const state = {
    items: ['🍰 Cake', '🍩 Donut', '🍎 Apple', '🍕 Pizza'],
  };
  const onDragStart = (e: any) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode.parentNode, 20, 20);
  };
  return (
    <div className={styles.container}>
      <main className={styles.main} onDragOver={(e) => e.preventDefault()}>
        <h3>List of items</h3>
        <ul className={styles.ul}>
          {state.items.map((item) => (
            <li className={styles.li} key={item}>
              <div className="drag">
                <img
                  draggable
                  onDragStart={onDragStart}
                  src={'./hamburger.png'}
                />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
export default Bands;
