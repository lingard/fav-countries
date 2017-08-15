import { compose, pick, path, prop, identity, values } from 'ramda'
import { createSelector } from 'reselect'

const createEntitySelectors = (name) => {
  const selectEntity = path(['entities', name])

  return ({
    byId: (state, id) =>
      compose(
        prop(id),
        selectEntity
      )(state),
    byIds: (state, ids) =>
      createSelector(
        selectEntity,
        compose(
          values,
          pick(ids)
        )
      ),
    all: createSelector(
      selectEntity,
      values
    )
  })
}

export default (name, actions = {}, reducer = identity) => ({
  name,
  select: createEntitySelectors(name),
  actions,
  reducer
})
