import * as React from "react";
import {
  Diagram,
  DiagramComponent,
  Inject,
  ConnectorModel,
  Node,
  DataBinding,
  TextModel,
  CommandManagerModel,
  Keys,
  NodeModel,
  NodeConstraints,
  ITextEditEventArgs,
  SnapConstraints,
  HierarchicalTree,
} from "@syncfusion/ej2-react-diagrams";
import { DataManager } from "@syncfusion/ej2-data";

interface NodeItem {
  id: number;
  Label: string;
  parentId?: number;
}

function MindMapper() {
  const [data, setData] = React.useState<NodeItem[]>([
    {
      id: 1,
      Label: "Start Mapping",
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
            if (
              diagramInstance.selectedItems.nodes &&
              diagramInstance.selectedItems.nodes.length > 0
            ) {
              return true;
            }
            return false;
          },
          //Command handler
          execute: function () {
            const parent =
              diagramInstance.selectedItems.nodes &&
              (diagramInstance.selectedItems.nodes[0].data as NodeItem);

            if (!parent) {
              return;
            }

            let updatedNodeItems = data;
            if (
              diagramInstance.addInfo &&
              (diagramInstance.addInfo as NodeItem[]).length > 0
            ) {
              for (let item of diagramInstance.addInfo as NodeItem[]) {
                updatedNodeItems = updatedNodeItems.map((item2) => {
                  if (item.id === item2.id) return item;
                  return item2;
                });
              }
            }
            let lastId: number = 1;
            for (let item of updatedNodeItems) {
              if (item.id >= lastId) {
                lastId += 1;
              }
            }
            const newNode = {
              id: lastId,
              parentId: parent.id,
              Label: "Enter text",
            };

            setData([...updatedNodeItems, newNode]);
          },
          gesture: {
            key: Keys.Tab,
          },
        },
      ],
    };
    return commandManager;
  };

  const getNodeDefaults = (obj: Node) => {
    obj.constraints =
      NodeConstraints.Default &
      ~NodeConstraints.Rotate &
      ~NodeConstraints.Drag &
      ~NodeConstraints.Resize;
    obj.shape = {
      type: "Text",
      content: (obj.data as {
        Label: "string";
      }).Label,
    };
    obj.style = {
      fill: "#f0f0f0",
      strokeColor: "none",
      strokeWidth: 2,
      color: "#303a52",
      fontSize: 20,
    };
    obj.borderColor = "#f0f0f0";
    obj.backgroundColor = "#f0f0f0";
    obj.borderWidth = 1;
    (obj.shape as TextModel).margin = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    };
    // root node styles
    if ((obj.data as { id: number }).id === 1) {
      obj.backgroundColor = "#c94e4e";
      obj.style = {
        fill: "#c94e4e",
        color: "#fff",
        bold: true,
      };
    }

    // immediate node child styles
    if ((obj.data as { parentId: number }).parentId === 1) {
      obj.style.color = "#fff";
      obj.backgroundColor = "#575151";
      obj.style.fill = "#575151";
    }
    return obj;
  };

  const getConnectorDefaults = (
    connector: ConnectorModel,
    diagram: Diagram
  ) => {
    connector.style = {
      strokeColor: "#5d5d5a",
      strokeWidth: 1,
    };
    if (connector.targetDecorator && connector.targetDecorator.style) {
      connector.targetDecorator.style.fill = "#ffa45c";
      connector.targetDecorator.style.strokeColor = "#ffa45c";
    }
    connector.type = "Bezier";
    return connector;
  };

  const handleTextEdit = (e: ITextEditEventArgs | undefined) => {
    const elem = e?.element as NodeModel;
    if (!elem) {
      return;
    }
    const node = elem.data as NodeItem;
    if (!node) return;
    let prevEditedNodes = diagramInstance.addInfo as NodeItem[];
    if (!prevEditedNodes) {
      diagramInstance.addInfo = [
        {
          ...node,
          Label: e?.newValue,
        },
      ];
      return;
    }
    let updatedInMap: boolean = false;
    if (prevEditedNodes.length > 0) {
      prevEditedNodes = prevEditedNodes.map((n) => {
        if (n.id === node.id) {
          updatedInMap = true;
          return {
            ...n,
            Label: e?.newValue,
          };
        }
        return n;
      }) as NodeItem[];
    }
    if (updatedInMap) {
      diagramInstance.addInfo = prevEditedNodes;
      return;
    }
    diagramInstance.addInfo = [
      ...prevEditedNodes,
      {
        ...node,
        Label: e?.newValue,
      },
    ];
  };

  return (
    <DiagramComponent
      backgroundColor="#f0f0f0"
      ref={(diagram: DiagramComponent) => {
        diagramInstance = diagram;
      }}
      id="diagram"
      width={"100%"}
      height={"550px"}
      layout={{
        type: "HierarchicalTree",
        orientation: "LeftToRight",
      }}
      dataSourceSettings={{
        id: "id",
        parentId: "parentId",
        dataManager: new DataManager(data),
        root: String(1),
      }}
      snapSettings={{
        constraints: SnapConstraints.None,
      }}
      pageSettings={{
        background: {
          color: "#f0f0f0",
        },
      }}
      getNodeDefaults={getNodeDefaults}
      getConnectorDefaults={getConnectorDefaults}
      commandManager={getCommandManagerSettings()}
      textEdit={handleTextEdit}
    >
      <Inject services={[DataBinding, HierarchicalTree]} />
    </DiagramComponent>
  );
}

export default MindMapper;
