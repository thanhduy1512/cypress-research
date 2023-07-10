import { DragEvent, useState } from 'react';
import styles from './Bands.module.css';
const Bands = () => {
  const [items, setItems] = useState([
    '🍰 Cake',
    '🍩 Donut',
    '🍎 Apple',
    '🍕 Pizza',
  ]);
  const [draggedItem, setDraggedItem] = useState('');

  const onDragStart = (e: any, index: number) => {
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode.parentNode, 20, 20);
  };

  const onDragOver = (index: number) => {
    const draggedOverItem = items[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let newItems = items.filter((item) => item !== draggedItem);

    // add the dragged item after the dragged over item
    console.log(index);

    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
  };

  const onDragEnd = () => {
    // draggedIdx = null;
  };
  return (
    <div className={styles.container}>
      <main className={styles.main} onDragOver={(e) => e.preventDefault()}>
        <h3>List of items</h3>
        <ul className={styles.ul}>
          {items.map((item, index) => (
            <li
              className={styles.li}
              key={item}
              onDragOver={() => onDragOver(index)}
            >
              <div className="drag">
                <img
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragEnd={onDragEnd}
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
