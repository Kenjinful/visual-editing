import {rem, Stack} from '@sanity/ui'
import {useContext, type ReactNode} from 'react'
import {type ObjectSchemaType} from 'sanity'
import {styled} from 'styled-components'
import {type PublishedId} from '../internals'
import type {PresentationPluginOptions} from '../types'
import {useDocumentLocations} from '../useDocumentLocations'
import {LocationsBanner} from './LocationsBanner'
import {PresentationDocumentContext} from './PresentationDocumentContext'

const LocationStack = styled(Stack)`
  min-height: ${rem(42)};

  & + &:empty {
    display: none;
  }
`

export function PresentationDocumentHeader(props: {
  documentId: PublishedId
  options: PresentationPluginOptions
  schemaType: ObjectSchemaType
}): ReactNode {
  const {documentId, options, schemaType} = props

  const context = useContext(PresentationDocumentContext)
  const {state, status} = useDocumentLocations({
    id: documentId,
    resolvers: options.resolve?.locations || options.locate,
    type: schemaType.name,
  })

  if ((context && context.options[0] !== options) || status === 'empty') {
    return null
  }

  const contextOptions = context?.options || []

  return (
    <LocationStack marginBottom={5} space={5}>
      <Stack space={2}>
        {contextOptions.map((options, idx) => (
          <LocationsBanner
            documentId={documentId}
            isResolving={status === 'resolving'}
            key={idx}
            options={options}
            schemaType={schemaType}
            showPresentationTitle={contextOptions.length > 1}
            state={state}
          />
        ))}
      </Stack>
    </LocationStack>
  )
}
