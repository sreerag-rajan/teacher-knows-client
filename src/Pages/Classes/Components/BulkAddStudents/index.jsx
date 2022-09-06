import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState} from 'react';
import { Manual } from './BulkAddStudents';
import { ImportStudents } from './ImportStudents';

const constants = {
  manual : 'manual',
  import : 'import'
};
export const BulkAddStudents = () => {
  const [mode, setMode] = useState(constants.manual);
  return (
    <React.Fragment>
      <Box>
        <ToggleButtonGroup
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          aria-label = 'Mode'
        >
          <ToggleButton value={constants.manual} aria-label='manual'>Manual</ToggleButton>
          <ToggleButton value={constants.import} aria-label='import'>Import</ToggleButton>

        </ToggleButtonGroup>
        
      </Box>
      {mode === constants.manual ? <Manual/> : <ImportStudents/>}

    </React.Fragment>
  )
}