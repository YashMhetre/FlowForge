from fastapi import APIRouter
from models.pipeline_models import PipelineData
from services.pipeline_service import is_dag

router = APIRouter(prefix="/pipelines", tags=["Pipelines"])

@router.post("/parse")
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status
    }
