import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../store/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { handleKeyDown } from '../utils/utils';

const dropInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
  },
};
const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
const closeButtonVariants = {
  hidden: {
    top: 40,
    opacity: 0,
  },
  visible: {
    top: -10,
    opacity: 1,
  },
  exit: {
    top: 40,
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update') {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [type, todo]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    if (type === 'add') {
      const newTodo = {
        id: nanoid(),
        title,
        status,
        time: format(new Date(), 'HH:mm, dd/M/yy'),
      };

      dispatch(addTodo(newTodo));
      setModalOpen(false);
      setTitle('');
      toast.success('Task Added Successfully');
    }

    if (type === 'update') {
      if (todo.title !== title || todo.status !== status) {
        dispatch(
          updateTodo({
            ...todo,
            title,
            status,
          })
        );
        toast.success('Task Updated Successfully');
      } else {
        toast.error('No Changes Made');
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          variants={wrapperVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <motion.div className={styles.container} variants={dropInVariants}>
            <motion.div
              className={styles.closeButton}
              variants={closeButtonVariants}
              role='button'
              tabIndex={0}
              onClick={() => setModalOpen(false)}
              onKeyDown={e => handleKeyDown(e, setModalOpen, false)}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} Todo
              </h1>
              <label htmlFor='title'>
                Title
                <input
                  id='title'
                  type='text'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor='type'>
                Status
                <select
                  id='type'
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value='incomplete'>Incomplete</option>
                  <option value='complete'>Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type='submit' variant='primary'>
                  {type === 'add' ? 'Add' : 'Update'} Task
                </Button>
                <Button variant='secondary' onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
