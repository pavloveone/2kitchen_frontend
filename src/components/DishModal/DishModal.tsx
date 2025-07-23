import { FC } from 'react';
import { Modal, Box, Typography, IconButton, Portal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NutritionChips } from '../Dishes/NutritionChips';
import { Dish } from '../../api';
import { styles } from './DishModal.styles';

interface DishModalProps {
  dish: Dish;
  open: boolean;
  onClose: () => void;
}

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
