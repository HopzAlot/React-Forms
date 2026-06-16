import { Container, Paper, Stack, Typography, Box } from '@mui/material'
import { OnboardingForm } from './sections/OnboardingForm'
import './App.css'

function App() {
  return (
    <Container maxWidth="sm" className="app-shell">
      <Stack spacing={3}>
        <Box className="page-heading">
          <Typography variant="h3" component="h1">
            Get started
          </Typography>
          <Typography color="text.secondary">
            Set up your account in a few quick steps.
          </Typography>
        </Box>

        <Paper elevation={2} className="form-panel">
          <OnboardingForm />
        </Paper>
      </Stack>
    </Container>
  )
}

export default App