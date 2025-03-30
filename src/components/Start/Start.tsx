import { useMemo } from 'react';
import { Stack, useTheme, useMediaQuery } from '@mui/material';
import { NotificationsNoneOutlined, MenuBook, Calculate } from '@mui/icons-material';
import { ILinkButtonProps, LinkButton } from '../Button';

export const Start = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const buttons = useMemo<ILinkButtonProps[]>(
    () => [
      {
        path: '/waiter',
        icon: <NotificationsNoneOutlined />,
        variant: 'outlined',
        title: 'Официант',
        isMobile,
        disabled: true,
      },
      {
        path: '/menu',
        icon: <MenuBook />,
        variant: 'outlined',
        title: 'Меню',
        isMobile,
      },
      {
        path: '/calculate',
        icon: <Calculate />,
        variant: 'outlined',
        title: 'Рассчитать',
        isMobile,
        disabled: true,
      },
    ],
    [isMobile],
  );

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      spacing={isMobile ? 1 : 2}
      sx={{
        height: '100%',
        padding: 2,
      }}
    >
      {buttons.map((button) => (
        <LinkButton key={button?.path} {...button} />
      ))}
    </Stack>
  );
};
