import { useState } from 'react'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { FormNavigation } from './components/FormNavigation'
import { ReactHookForm } from './sections/ReactHookForm'
import { ReactStateForm } from './sections/ReactStateForm'
import { ZodValidationForm } from './sections/ZodValidationForm'
import type { FormView } from './types/jobApplication'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<FormView>('react')

  return (
    <Container maxWidth="lg" className="app-shell">
      <Stack spacing={3}>
        <Box className="page-heading">
          <Typography variant="h3" component="h1">
            Job Application Forms
          </Typography>
          <Typography color="text.secondary">
            Three versions of the same information form, built with React, React
            Hook Form, and Zod validation.
          </Typography>
        </Box>

        <FormNavigation
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <Paper elevation={2} className="form-panel">
          {activeView === 'react' && <ReactStateForm />}
          {activeView === 'hook' && <ReactHookForm />}
          {activeView === 'zod' && <ZodValidationForm />}
        </Paper>
      </Stack>
    </Container>
  )
}

export default App
