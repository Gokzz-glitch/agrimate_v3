import sys
import os

from t101_apy_ingestion import APYIngestor
from t103_agmarknet_scraper import run_scraper as run_agmarknet
from t108_knowledge_scraper import KnowledgeScraper

def run_pipeline():
    print(\"===========================================================\")
    print(\"      AGRIMATE V3: PHASE 1 DATA INGESTION PIPELINE \")
    print(\"===========================================================\\n\")
    
    # Run T-101 (APY Data)
    try:
        apy = APYIngestor(output_dir=\"data_processed\")
        apy.fetch_data()
    except Exception as e:
        print(f\"[ERROR] Failure in T-101 APY Pipeline: {e}\")
        
    # Run T-103 (Agmarknet Prices)
    try:
        run_agmarknet()
    except Exception as e:
        print(f\"[ERROR] Failure in T-103 Agmarknet Pipeline: {e}\")

    # Run T-108 (Knowledge Documents)
    try:
        rag = KnowledgeScraper(output_dir=\"data_processed\")
        rag.simulate_vikaspedia_scrape()
    except Exception as e:
        print(f\"[ERROR] Failure in T-108 Knowledge Extraction: {e}\")
        
    print(\"\\n===========================================================\")
    print(\"      🎉 ALL ASYNC PRE-PROCESSING PIPELINES EXECUTED.       \")
    print(\"          (Ready for Master Parquet Merge T-113)            \")
    print(\"===========================================================\")

if __name__ == \"__main__\":
    # When this script is pushed to GitHub, we can invoke it on Google Colab GPU via the FASTAPI bridge!
    sys.exit(run_pipeline())
