import React, { useState } from 'react';
import { IntrospectionSchema, IntrospectionType } from 'graphql';
import { SchemaItem } from '../SchemaItem/SchemaItem';
import { SchemaRoot } from '../SchemaRoot/SchemaRoot';
import { OnSelectItem } from './types/onSelect';
import styles from './Schema.module.css';
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

interface SchemaProps {
  schema: GraphQLSchema | null;
}

const Schema: React.FC<SchemaProps> = ({ schema }) => {
  if (!schema) {
    return <div>Schema is not available</div>;
  }

  return (
    <div className={styles.modal}>
      <SchemaRoot schema={schema} onSelect={() => console.log('Hello')} />
    </div>
  );
};

export default Schema;

/* query IntrospectionQuery {
  __schema {
    types {
      name
      kind
      description
      fields {
        name
        description
        args {
          name
          description
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
} */

/*  {
          "name": "Query",
          "kind": "OBJECT",
          "description": null,
          "fields": [
            {
              "name": "status",
              "description": "{\"en\":\"Determines whether the request is authorized.\",\"ru\":\"Определяет, является ли запрос авторизованным.\"}",
              "args": []
            },
            {
              "name": "region",
              "description": "{\"en\":\"Returns the region by ID.\",\"ru\":\"Возвращает регион по ID.\"}",
              "args": [
                {
                  "name": "id",
                  "description": "{\"en\":\"The region ID.\",\"ru\":\"ID региона.\"}",
                  "type": {
                    "name": null,
                    "kind": "NON_NULL",
                    "ofType": { "name": "Int", "kind": "SCALAR" }
                  }
                }
              ]
            },
            {
              "name": "continents",
              "description": "{\"en\":\"Returns a list of all continents.\",\"ru\":\"Возвращает список всех континентов.\"}",
              "args": []
            },
            {
              "name": "countries",
              "description": "{\"en\":\"Returns a list of all countries.\",\"ru\":\"Возвращает список всех стран.\"}",
              "args": []
            },
            {
              "name": "regions",
              "description": "{\"en\":\"Returns a list of regions.\",\"ru\":\"Возвращает список регионов.\"}",
              "args": [
                {
                  "name": "first",
                  "description": "{\"en\":\"The number of items on the page. Used for forward pagination.\",\"ru\":\"Количество элементов на странице. Используется для навигации вперед.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "after",
                  "description": "{\"en\":\"The cursor of the item relative to which the next items should be returned. Used for forward pagination.\",\"ru\":\"Курсор элемента, относительно которого должны быть возвращены следующие элементы. Используется для навигации вперед.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "last",
                  "description": "{\"en\":\"The number of items on the page. Used for backward pagination.\",\"ru\":\"Количество элементов на странице. Используется для навигации назад.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "before",
                  "description": "{\"en\":\"The cursor of the item relative to which the previous items should be returned. Used for backward pagination.\",\"ru\":\"Курсор элемента, относительно которого должны быть возвращены предыдущие элементы. Используется для навигации назад.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "type",
                  "description": "{\"en\":\"The type of the region. Possible values: continent, country, division1, division2, division3, division4, city.\",\"ru\":\"Тип региона. Возможные значения: continent, country, division1, division2, division3, division4, city.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "countryCode",
                  "description": "{\"en\":\"The code of the country (ISO-639-1).\",\"ru\":\"Код страны (ISO-639-1).\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division1Code",
                  "description": "{\"en\":\"The code of the first-order country division.\",\"ru\":\"Код подразделения страны первого порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division2Code",
                  "description": "{\"en\":\"The code of the second-order country division.\",\"ru\":\"Код подразделения страны второго порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division3Code",
                  "description": "{\"en\":\"The code of the third-order country division.\",\"ru\":\"Код подразделения страны третьего порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division4Code",
                  "description": "{\"en\":\"The code of the fourth-order country division.\",\"ru\":\"Код подразделения страны четвертого порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                }
              ]
            },
            {
              "name": "childRegions",
              "description": "{\"en\":\"Returns a list of regions located within the specified region.\",\"ru\":\"Возвращает список регионов, расположенных внутри указанного региона.\"}",
              "args": [
                {
                  "name": "first",
                  "description": "{\"en\":\"The number of items on the page. Used for forward pagination.\",\"ru\":\"Количество элементов на странице. Используется для навигации вперед.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "after",
                  "description": "{\"en\":\"The cursor of the item relative to which the next items should be returned. Used for forward pagination.\",\"ru\":\"Курсор элемента, относительно которого должны быть возвращены следующие элементы. Используется для навигации вперед.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "last",
                  "description": "{\"en\":\"The number of items on the page. Used for backward pagination.\",\"ru\":\"Количество элементов на странице. Используется для навигации назад.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "before",
                  "description": "{\"en\":\"The cursor of the item relative to which the previous items should be returned. Used for backward pagination.\",\"ru\":\"Курсор элемента, относительно которого должны быть возвращены предыдущие элементы. Используется для навигации назад.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "parentId",
                  "description": "{\"en\":\"The ID of the parent region.\",\"ru\":\"ID родительского региона.\"}",
                  "type": {
                    "name": null,
                    "kind": "NON_NULL",
                    "ofType": { "name": "Int", "kind": "SCALAR" }
                  }
                }
              ]
            },
            {
              "name": "searchRegions",
              "description": "{\"en\":\"Returns a list of regions by a search term.\",\"ru\":\"Возвращает список регионов по поисковому запросу.\"}",
              "args": [
                {
                  "name": "searchTerm",
                  "description": "{\"en\":\"A query used to search for regions by name.\",\"ru\":\"Запрос, используемый для поиска регионов по названию.\"}",
                  "type": {
                    "name": null,
                    "kind": "NON_NULL",
                    "ofType": { "name": "String", "kind": "SCALAR" }
                  }
                },
                {
                  "name": "first",
                  "description": "{\"en\":\"The number of regions.\",\"ru\":\"Количество регионов.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "type",
                  "description": "{\"en\":\"The type of the region. Possible values: continent, country, division1, division2, division3, division4, city.\",\"ru\":\"Тип региона. Возможные значения: continent, country, division1, division2, division3, division4, city.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "countryCode",
                  "description": "{\"en\":\"The code of the country (ISO-639-1).\",\"ru\":\"Код страны (ISO-639-1).\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division1Code",
                  "description": "{\"en\":\"The code of the first-order country division.\",\"ru\":\"Код подразделения страны первого порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division2Code",
                  "description": "{\"en\":\"The code of the second-order country division.\",\"ru\":\"Код подразделения страны второго порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division3Code",
                  "description": "{\"en\":\"The code of the third-order country division.\",\"ru\":\"Код подразделения страны третьего порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "division4Code",
                  "description": "{\"en\":\"The code of the fourth-order country division.\",\"ru\":\"Код подразделения страны четвертого порядка.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                }
              ]
            },
            {
              "name": "nearestRegions",
              "description": "{\"en\":\"Returns a list of regions located near the specified location.\",\"ru\":\"Возвращает список регионов, расположенных рядом с указанным местоположением.\"}",
              "args": [
                {
                  "name": "latitude",
                  "description": "{\"en\":\"The latitude of the location.\",\"ru\":\"Широта местоположения.\"}",
                  "type": { "name": "Float", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "longitude",
                  "description": "{\"en\":\"The longitude of the location.\",\"ru\":\"Долгота местоположения.\"}",
                  "type": { "name": "Float", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "id",
                  "description": "{\"en\":\"The ID of the region relative to which the search will be performed.\",\"ru\":\"ID региона, относительно которого будет выполняться поиск.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "first",
                  "description": "{\"en\":\"The number of regions.\",\"ru\":\"Количество регионов.\"}",
                  "type": { "name": "Int", "kind": "SCALAR", "ofType": null }
                },
                {
                  "name": "type",
                  "description": "{\"en\":\"The type of the region. Possible values: continent, country, division1, division2, division3, division4, city.\",\"ru\":\"Тип региона. Возможные значения: continent, country, division1, division2, division3, division4, city.\"}",
                  "type": { "name": "String", "kind": "SCALAR", "ofType": null }
                }
              ]
            },
            {
              "name": "network",
              "description": "{\"en\":\"Detects the region by the IP address.\",\"ru\":\"Определяет регион по IP-адресу.\"}",
              "args": [
                {
                  "name": "ip",
                  "description": "{\"en\":\"The IP address.\",\"ru\":\"IP-адрес.\"}",
                  "type": {
                    "name": null,
                    "kind": "NON_NULL",
                    "ofType": { "name": "String", "kind": "SCALAR" }
                  }
                }
              ]
            },
            {
              "name": "node",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "name": null,
                    "kind": "NON_NULL",
                    "ofType": { "name": "ID", "kind": "SCALAR" }
                  }
                }
              ]
            }
          ]
        }, */
