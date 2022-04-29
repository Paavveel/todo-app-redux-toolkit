import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const { todos, filterStatus } = useSelector(state => state.todos);

  const sortedTodoList = [...todos].reverse();

  const filteredTodoList = sortedTodoList.filter(todo => {
    if (filterStatus === 'all') {
      return true;
    }
    return todo.status === filterStatus;
  });

  console.log(todos[0].time);
  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map(todo => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todo Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
