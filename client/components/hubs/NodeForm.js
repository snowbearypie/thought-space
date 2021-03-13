import React from 'react'

export const NodeForm = props => (
  <form id="node-form" onSubmit={props.handleSubmit}>
    <label htmlFor="nodeName">Node Name:</label>
    <input
      name="name"
      type="text"
      onChange={props.handleChange}
      value={props.name}
    />
    <br />

    <label htmlFor="node-description">Node Description:</label>
    <textarea
      name="description"
      type="textarea"
      onChange={props.handleChange}
      value={props.description}
    />
    <br />

    <label htmlFor="node-nodeTag">Node tag:</label>
    <input
      name="nodeTag"
      type="text"
      onChange={props.handleChange}
      value={props.nodeTag}
    />
    <br />

    <label htmlFor="node-isPrivate">Node Privacy:</label>
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

export default NodeForm
