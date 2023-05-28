import React, {Fragment} from 'react'
import { Form, Segment, Checkbox } from "semantic-ui-react"

function EntryForm({description, value, isExpense, setDescription, setValue, setIsExpense}) {
  return (
    <Fragment>
        <Form.Group widths={3}>
          <Form.Input icon="tags" width={12} label="Description" placeholder="New shiny thing" value={description} onChange={(event) => setDescription(event.target.value)}/>
          <Form.Input icon="dollar" iconPosition='left' width={4} label="Value" placeholder="100.00" value={value} onChange={(event) => setValue(event.target.value)} /> 
        </Form.Group>
        <Segment compact>
          <Checkbox label="Is Expense?" toggle checked={isExpense} onChange={() => setIsExpense(oldState => !oldState)}/>
        </Segment>
    </Fragment>
  )
}

export default EntryForm