import { IntrospectionField, IntrospectionType } from 'graphql/utilities';

interface TypeProps {
  type: IntrospectionType;
}

/* const Type: React.FC<TypeProps> = ({ type }) => {
  const renderFields = (fields: IntrospectionField[]) => {
    return fields.map((field) => {
      if (field.type.kind === 'OBJECT') {
        return <Type type={field.type} />;
      } else {
        return (
          <div key={field.name}>
            <div>{field.name}</div>
            <div>{field.description}</div>
            <div>{field.type.name}</div>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <div>{type.name}</div>
      <div>{type.description}</div>
      {type.fields && renderFields(type.fields)}
    </div>
  );
}; */
