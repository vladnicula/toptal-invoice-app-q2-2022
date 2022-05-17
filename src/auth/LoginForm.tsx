import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, TextField, Button } from "@mui/material";

const schema = yup.object({
  email: yup.string().email("CUSTOM_EMAIL_MESSAGE").required(),
  password: yup.string().required(),
})

export type LoginFormValue = yup.InferType<typeof schema>

export type LoginFormProps = {
    onLoginRequest: (values: LoginFormValue) => unknown
}

export const LoginForm = (props: LoginFormProps) => {

    const { register, handleSubmit, formState:{ errors } } = useForm<LoginFormValue>({
        resolver: yupResolver(schema)
    });

    return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Box component="form" onSubmit={handleSubmit(props.onLoginRequest)} noValidate sx={{ mt: 1, width: 380 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              inputProps={{
                  "data-test": "email"
              }}
              error={!!errors.email}
              helperText={
                  <span data-test='email-error'>{errors.email?.message}</span>
                ?? " "}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
        </Box>
        </Box>
    )
}
