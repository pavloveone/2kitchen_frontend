import { FC } from 'react';
import { Modal, Box, Typography, IconButton, Portal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dish } from '../../interfaces';
import { NutritionChips } from '../Dishes/NutritionChips';

interface DishModalProps {
  dish: Dish;
  open: boolean;
  onClose: () => void;
}

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: { xs: 1, sm: 2 },
    overflow: 'auto',
  },
  modalContent: {
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
    width: { xs: '80%', sm: '80vw', md: 600 },
    maxWidth: 600,
    outline: 'none',
    position: 'relative',
    maxHeight: { xs: '80%', sm: '90vh' },
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    right: { xs: 0, sm: 2 },
    top: { xs: 0, sm: 2 },
    color: 'text.secondary',
    p: 0.5,
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'grey.900',
    },
  },
  modalImage: {
    width: 'auto',
    height: { xs: 120, sm: 180, md: 200 },
    borderRadius: 1,
    objectFit: 'cover',
    mb: { xs: 1, sm: 2 },
  },
  title: {
    fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.125rem' },
    fontWeight: 600,
    lineHeight: 1.2,
    mb: { xs: 0.5, sm: 1 },
  },
  description: {
    fontSize: { xs: '0.8125rem', sm: '0.9375rem', md: '1rem' },
    mt: { xs: 0.5, sm: 1 },
    mb: { xs: 0.5, sm: 1 },
  },
  nutritionTitle: {
    fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' },
    mb: { xs: 0.5, sm: 1 },
  },
  contentWrapper: {
    flex: 1,
    overflow: 'auto',
    pr: { xs: 0.5, sm: 0 },
  },
};

export const DishModal: FC<DishModalProps> = ({ dish, open, onClose }) => {
  return (
    <Portal>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="dish-modal-title"
        aria-describedby="dish-modal-description"
        sx={styles.modal}
      >
        <Box sx={styles.modalContent}>
          <IconButton aria-label="close" onClick={onClose} sx={styles.closeButton} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box component="img" src={dish.image} alt={dish.name} sx={styles.modalImage} />

          <Box sx={styles.contentWrapper}>
            <Typography id="dish-modal-title" component="h2" sx={styles.title}>
              {dish.name}
            </Typography>

            <NutritionChips dish={dish} />

            <Typography id="dish-modal-description" sx={styles.description}>
              {dish.description}
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={styles.nutritionTitle}>
              Пищевая ценность: {dish.calories} ккал
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Portal>
  );
};
