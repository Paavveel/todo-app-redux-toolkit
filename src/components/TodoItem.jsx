import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../store/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses, handleKeyDown } from '../utils/utils';

// Components
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const { id, title, status, time } = todo;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'complete') {
      setChecked(true);
    }
  }, [status]);

  const handleDelete = () => {
    dispatch(deleteTodo(id));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(prev => !prev);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  return (
    <motion.div className={styles.item} variants={child}>
      <div className={styles.todoDetails}>
        <CheckButton checked={checked} handleCheck={handleCheck} />
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              status === 'complete' && styles['todoText--completed'],
            ])}
          >
            {title}
          </p>
          <p className={styles.time}>{time}</p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          tabIndex={0}
          role='button'
          onClick={handleDelete}
          onKeyDown={e => handleKeyDown(e, handleDelete)}
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          tabIndex={0}
          role='button'
          onClick={handleUpdate}
          onKeyDown={e => handleKeyDown(e, handleUpdate)}
        >
          <MdEdit />
        </div>
      </div>
      <TodoModal
        type='update'
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </motion.div>
  );
}

export default TodoItem;
