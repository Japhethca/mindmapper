import * as React from "react";
import {
  Diagram,
  DiagramComponent,
  Inject,
  ConnectorModel,
  Node,
  DataBinding,
  //   LayoutType,
  //   Rect,
  //   HorizontalAlignment,
  //   VerticalAlignment,
  TextModel,
  MindMap,
  CommandManagerModel,
  Keys,
  NodeModel,
} from "@syncfusion/ej2-react-diagrams";
import { DataManager, Query } from "@syncfusion/ej2-data";

interface StateProps {
  id: number;
  Label: string;
  parentId?: number;
}

function MindMapper() {
  const [data, setData] = React.useState<StateProps[]>([
    {
      id: 1,
      Label: "StackPanel",
    },
  ]);
  let diagramInstance: DiagramComponent;

  const getCommandManagerSettings = (): CommandManagerModel => {
    let commandManager: CommandManagerModel = {
      commands: [
        {
          name: "createNode",
          parameter: "node",
          //Method to define whether the command can be executed at the current moment
          canExecute: function () {
            //Defines that the clone command can be executed, if and only if the selection list is not empty.
            console.log(diagramInstance.selectedObject.actualObject);
            if (diagramInstance.selectedObject.actualObject) {
              return true;
            }
            return false;
          },
          //Command handler
          execute: function () {
            setData([...data, { id: 2, parentId: 1, Label: "Testing" }]);
          },
          gesture: {
            key: Keys.Tab,
          },
        },
      ],
    };
    return commandManager;
  };
  return (
    <DiagramComponent
      ref={(diagram: DiagramComponent) => {
        diagramInstance = diagram;
      }}
      id="diagram"
      width={"100%"}
      height={"550px"}
      //Uses layout to auto-arrange nodes on the diagram page
      layout={{
        //Sets layout type
        type: "MindMap",
      }}
      //Configures data source for diagram
      dataSourceSettings={{
        id: "id",
        parentId: "parentId",
        dataManager: new DataManager(data),
        root: String(1),
      }}
      //Sets the default properties for nodes and connectors
      getNodeDefaults={(obj: Node) => {
        obj.shape = {
          type: "Text",
          content: (obj.data as {
            Label: "string";
          }).Label,
        };
        obj.style = {
          fill: "#6BA5D7",
          strokeColor: "none",
          strokeWidth: 2,
        };
        obj.borderColor = "white";
        obj.backgroundColor = "#6BA5D7";
        obj.borderWidth = 1;
        (obj.shape as TextModel).margin = {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        };
        return obj;
      }}
      getConnectorDefaults={(connector: ConnectorModel, diagram: Diagram) => {
        connector.style = {
          strokeColor: "#6BA5D7",
          strokeWidth: 2,
        };

        // connector.targetDecorator.style.fill = "#6BA5D7";
        // connector.targetDecorator.style.strokeColor = "#6BA5D7";
        connector.type = "Orthogonal";
        return connector;
      }}
      commandManager={getCommandManagerSettings()}
    >
      <Inject services={[DataBinding, MindMap]} />
    </DiagramComponent>
  );
}

export default MindMapper;
