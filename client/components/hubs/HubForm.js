import React from 'react'

export const HubForm = props => (
  <form id="hub-form" onSubmit={props.handleSubmit}>
    <label htmlFor="hubName">Hub Name:</label>
    <input
      name="name"
      type="text"
      onChange={props.handleChange}
      value={props.name}
    />
    <br />

    <label htmlFor="hub-description">Hub Description:</label>
    <textarea
      name="description"
      type="textarea"
      onChange={props.handleChange}
      value={props.description}
    />
    <br />

    <label htmlFor="hub-hubTag">Hub tag:</label>
    <input
      name="hubTag"
      type="text"
      onChange={props.handleChange}
      value={props.hubTag}
    />
    <br />

    <label htmlFor="hub-isPrivate">Hub Privacy:</label>
    <select
      name="isPrivate"
      type="text"
      onChange={props.handleChange}
      value={props.isPrivate}
    >
      <option value="false">Public</option>
      <option value="true">Private</option>
    </select>
    <br />

    <button type="submit">Submit</button>
  </form>
)

export default HubForm
