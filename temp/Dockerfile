FROM node:18

# Install basic development tools
RUN apt update && apt install -y less man-db sudo vim curl unzip

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Ubuntuを最新状態に更新し、Python3.11とそのvenvパッケージをインストール
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y python3.11 python3.11-distutils python3.11-venv curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 仮想環境を作成し、その環境でpipをインストール
RUN python3.11 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python get-pip.py && \
    rm get-pip.py

# aws cli v2 のインストール
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf aws awscliv2.zip

# Serverless Framework のインストール
RUN npm install -g serverless

# Switch to `node` user
USER $USERNAME

# Set default work directory
WORKDIR /app
