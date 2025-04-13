import { FC, useCallback, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDishStore } from '../../../store';

interface AddDishFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddDishForm: FC<AddDishFormProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const { addDish } = useDishStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };
      validate(updatedForm);
      return updatedForm;
    });
  };

  const validate = (formToValidate: typeof form) => {
    const newErrors: { [key: string]: boolean } = {};
    Object.entries(formToValidate).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = true;
      } else if (
        ['price', 'protein', 'fat', 'carbs', 'calories'].includes(key) &&
        isNaN(Number(value))
      ) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        if (Object.keys(errors).length > 0) return;

        const newDish = {
          ...form,
          price: parseFloat(form.price),
          protein: parseFloat(form.protein),
          fat: parseFloat(form.fat),
          carbs: parseFloat(form.carbs),
          calories: parseFloat(form.calories),
          restaurant: 1,
        };

        await addDish(newDish);
      } catch (error) {
        console.error('Error while add dish to rest', error);
      } finally {
        setForm({
          name: '',
          description: '',
          price: '',
          image: '',
          protein: '',
          fat: '',
          carbs: '',
          calories: '',
        });
        setErrors({});
        onClose();
      }
    },
    [addDish, errors, form, onClose],
  );

  const isFormValid =
    Object.keys(errors).length === 0 && Object.values(form).every((value) => value.trim() !== '');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить блюдо</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Stack spacing={3}>
              {[
                { label: 'Название', name: 'name', type: 'text' },
                { label: 'Описание', name: 'description', type: 'text', multiline: true, rows: 3 },
                { label: 'Цена', name: 'price', type: 'number' },
                { label: 'URL изображения', name: 'image', type: 'text' },
                { label: 'Белки (г)', name: 'protein', type: 'number' },
                { label: 'Жиры (г)', name: 'fat', type: 'number' },
                { label: 'Углеводы (г)', name: 'carbs', type: 'number' },
                { label: 'Калории (ккал)', name: 'calories', type: 'number' },
              ].map(({ label, name, type, multiline, rows }) => (
                <Box key={name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ width: 250, alignSelf: 'center' }}>
                    {label}:
                  </Typography>
                  <TextField
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    required
                    error={!!errors[name]}
                    fullWidth
                    type={type}
                    multiline={multiline}
                    rows={rows || 1}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ borderRadius: 2, width: '100%' }}
          disabled={!isFormValid}
        >
          Добавить блюдо
        </Button>
      </DialogActions>
    </Dialog>
  );
};
