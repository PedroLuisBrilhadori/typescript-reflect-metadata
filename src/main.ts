import "reflect-metadata";

const Controller = (path: string) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata("Controller", path, target, key);
  };
};

const Post = (path: string) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata("Post", path, target, key);
  };
};

const Get = (path: string) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata("Get", path, target, key);
  };
};

@Controller("/player")
class PlayerController {
  constructor() {}

  @Post("/start")
  startGame() {
    console.log("aa");
  }

  @Get("/")
  getPlayer() {
    console.log("test");
  }
}

const controllerName = Reflect.getMetadata("Controller", PlayerController);

const routes = Object.getOwnPropertyNames(PlayerController.prototype).filter(
  (route) => route !== "constructor"
);

console.log(routes);

const routesName = [];

const types = ["Get", "Post"];

for (const type of types)
  for (const route of routes) {
    const decorator = Reflect.getMetadata(
      type,
      PlayerController.prototype,
      route
    );

    if (decorator)
      routesName.push({
        route,
        type,
        path: decorator,
      });
  }

console.log("\ncontroller:", controllerName);
console.log("routes: ", routesName);
