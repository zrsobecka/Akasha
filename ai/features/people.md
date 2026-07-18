# People

Owns local people profiles, person selection, and profile editing. `PeopleWorkspace` composes the active person-centered workflow.

Changing a type preserves the profile ID and observations but resets confidence to `Working`, because the new type is a new hypothesis. Persistence belongs to the people repository in `infrastructure/persistence/local-storage/personStorage.ts`, not to React components.
