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
  const todoList = useSelector(state => state.todos.todos);

  const sortedTodolist = [...todoList];
  sortedTodolist.sort((a, b) => b.time - a.time);

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <AnimatePresence>
        {sortedTodolist && sortedTodolist.length > 0 ? (
          sortedTodolist.map(todo => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
